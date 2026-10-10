'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { fetchProductByIdOrSlug, toBengaliNumber, getProductEmoji } from '@/lib/utils';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { ArrowLeft, Store } from 'lucide-react';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('পণ্যের বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন');
      router.push('/signin');
      return;
    }

    if (user && slug) {
      fetchProductByIdOrSlug(slug).then((data) => {
        setProduct(data);
        setLoading(false);
      });
    }
  }, [user, authLoading, slug, router]);

  if (authLoading || loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 text-sm">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-2">পণ্যটি পাওয়া যায়নি</h2>
        <Link href="/" className="inline-block bg-emerald-700 text-white text-sm px-5 py-2.5 rounded-xl font-semibold">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const prices = product.markets ? product.markets.flatMap((m) => [m.min, m.max]) : [product.today];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-emerald-700 font-medium">
        <ArrowLeft className="w-4 h-4" /> পেছনে ফিরে যান
      </Link>

      {/* টপ সামারি */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-24 h-24 rounded-2xl bg-emerald-50 flex items-center justify-center text-5xl select-none">
          {getProductEmoji(product)}
        </div>
        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            {product.categoryNameBn || product.category}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{product.nameBn}</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            প্রতি {product.unit === 'kg' ? 'কেজি' : product.unit} • আজকের জাতীয় গড় দাম {toBengaliNumber(product.today)} টাকা
          </p>
        </div>
      </div>

      {/* প্রাইস সামারি */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center">
          <span className="text-xs text-gray-400 block mb-1">সর্বনিম্ন দাম</span>
          <span className="text-2xl font-black text-emerald-600">{toBengaliNumber(minPrice)} টাকা</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center">
          <span className="text-xs text-gray-400 block mb-1">গড় দাম</span>
          <span className="text-2xl font-black text-gray-900">{toBengaliNumber(avgPrice)} টাকা</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 text-center">
          <span className="text-xs text-gray-400 block mb-1">সর্বোচ্চ দাম</span>
          <span className="text-2xl font-black text-red-600">{toBengaliNumber(maxPrice)} টাকা</span>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Store className="w-5 h-5 text-emerald-700" />
          <h3 className="font-bold text-gray-900 text-lg">বাজারভিত্তিক আজকের দাম</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 text-xs uppercase font-semibold">
              <tr>
                <th className="px-4 py-3 rounded-l-xl">বাজার</th>
                <th className="px-4 py-3">বিভাগ</th>
                <th className="px-4 py-3">সর্বনিম্ন</th>
                <th className="px-4 py-3 rounded-r-xl">সর্বোচ্চ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {product.markets?.map((m, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3.5 font-medium text-gray-900">{m.market}</td>
                  <td className="px-4 py-3.5">{m.division}</td>
                  <td className="px-4 py-3.5 text-emerald-700 font-bold">{toBengaliNumber(m.min)} টাকা</td>
                  <td className="px-4 py-3.5 text-red-700 font-bold">{toBengaliNumber(m.max)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}