'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading, logout, refetch } = useAuth();
  const [customName, setCustomName] = useState(null);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  // React 19 রুল মেনে স্টেট হ্যান্ডলিং
  const name = customName !== null ? customName : (user?.name || '');

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('অনুগ্রহ করে নাম লিখুন');
      return;
    }

    setUpdating(true);
    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || 'আপডেট ব্যর্থ হয়েছে');
      } else {
        if (refetch) await refetch();
        toast.success('তথ্য সফলভাবে আপডেট হয়েছে!');
      }
    } catch {
      toast.error('আপডেট করতে সমস্যা হয়েছে');
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/signin');
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto my-20 p-8 text-center">
        <div className="w-10 h-10 border-4 border-[#05893e] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-gray-500">প্রোফাইল লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-[#fafcfa] rounded-3xl border border-[#e5ebe5] shadow-sm">
        <p className="text-gray-600 mb-4 text-sm">প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন।</p>
        <Link href="/signin" className="bg-[#05893e] text-white px-5 py-2.5 rounded-xl text-sm font-semibold inline-block">
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      {/* শিরোনাম */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* কার্ড ১: ছবি, নাম, ইমেইল এবং সাইন আউট বাটন */}
      <div className="bg-[#fafcfa] rounded-2xl p-5 sm:p-6 border border-[#e5ebe5] flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0 relative flex items-center justify-center">
            <Image
              src="/rezwan.png"
              alt="প্রোফাইল ছবি"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-snug">
              {user?.name || 'Rezwan Ahmed'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-snug mt-0.5">
              {user?.email || 'rezwanahmed@gmail.com'}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="border border-[#d03739] text-[#d03739] hover:bg-red-50/70 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4 rotate-180" />
          <span>সাইন আউট</span>
        </button>
      </div>

      {/* কার্ড ২: তথ্য আপডেট ফর্ম */}
      <div className="bg-[#fafcfa] rounded-2xl p-5 sm:p-6 border border-[#e5ebe5] shadow-2xs space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-gray-900">
          তথ্য
        </h3>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              required
              className="w-full bg-[#fafcfa] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#05893e] transition"
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-[#05893e] hover:bg-[#047032] text-white font-semibold py-3 rounded-xl text-sm transition shadow-sm disabled:opacity-50 mt-2 cursor-pointer"
          >
            {updating ? 'আপডেট হচ্ছে...' : 'আপডেট'}
          </button>
        </form>
      </div>
    </div>
  );
}