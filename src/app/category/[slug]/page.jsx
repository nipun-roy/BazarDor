'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    let active = true;
    fetchProducts(slug).then((data) => {
      if (active) {
        setProducts(data || []);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [slug]);

  // C1: সংখ্যা অনুযায়ী সঠিক সর্টিং
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'lowToHigh') return a.today - b.today;
    if (sortOption === 'highToLow') return b.today - a.today;
    return 0;
  });

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 text-center bg-[#fafcfa] rounded-3xl border border-[#e5ebe5] shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-2">কোনো পণ্য পাওয়া যায়নি</h2>
        <p className="text-sm text-gray-500 mb-6">এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য তালিকাভুক্ত নেই।</p>
        <Link href="/" className="inline-block bg-[#05893e] text-white text-sm px-5 py-2.5 rounded-xl font-semibold">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const categoryName = products[0]?.categoryNameBn || slug;
  const categoryIcon = products[0]?.categoryIcon || '🛒';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{categoryIcon}</span>
          <h1 className="text-2xl font-extrabold text-gray-900">{categoryName}</h1>
        </div>

        {/* C1: সর্ট ড্রপডাউন */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label className="text-xs text-gray-500">সাজান:</label>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-xs font-semibold rounded-xl pl-3 pr-8 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#05893e]"
            >
              <option value="default">ডিফল্ট</option>
              <option value="lowToHigh">দাম: কম থেকে বেশি</option>
              <option value="highToLow">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}