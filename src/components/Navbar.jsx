'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getBengaliDate } from '@/lib/utils';
import { User, LogOut } from 'lucide-react';

const CATEGORIES = [
  { slug: 'chal', nameBn: 'চাল', icon: '🍚' },
  { slug: 'dal', nameBn: 'ডাল', icon: '🫘' },
  { slug: 'tel', nameBn: 'তেল', icon: '🫙' },
  { slug: 'sobji', nameBn: 'সবজি', icon: '🥬' },
  { slug: 'mach', nameBn: 'মাছ', icon: '🐟' },
  { slug: 'mangsho', nameBn: 'মাংস', icon: '🍗' },
  { slug: 'dim-dui', nameBn: 'ডিম-দুধ', icon: '🥛' },
  { slug: 'mosla', nameBn: 'মসলা', icon: '🌶️' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const banglaDate = getBengaliDate();

  return (
    <header className="bg-[#fafcfa] border-b border-[#e5ebe5] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* লোগো ও বাংলা তারিখ */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#05893e] rounded-xl flex items-center justify-center text-white shadow-sm overflow-hidden p-2">
            <Image src="/logo-icon.png" alt="লোগো" width={24} height={24} className="object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 group-hover:text-[#05893e] transition leading-tight">
              বাজার দর
            </h1>
            <p className="text-xs text-gray-500">{banglaDate}</p>
          </div>
        </Link>

        {/* ডানদিকের অথ বাটন / ফিগমার মতো প্রোফাইল মেনু */}
        <div className="relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:opacity-85 transition cursor-pointer"
              >
                {/* 👉 ফিগমার মতো চারকোনা রাউন্ডেড অ্যাভাটার বক্স */}
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-emerald-50 border border-emerald-100/60 shrink-0 relative flex items-center justify-center">
                  <img
                    src={user?.image || "/rezwan.png"}
                    alt={user?.name || "Rezwan"}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* 👉 ফিগমার মতো সংক্ষেপ নাম ও অ্যারো */}
                <span className="text-sm font-semibold text-gray-900">
                  {user?.name?.split(' ')[0] || 'Rezwan'}
                </span>
                <span className="text-xs text-gray-500">▾</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#fafcfa] rounded-2xl shadow-xl border border-[#e5ebe5] py-3 px-2 z-50 animate-in fade-in">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="font-semibold text-gray-900 text-sm">
                      {user.name || 'Rezwan Ahmed'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email || 'rezwanahmed@gmail.com'}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-xl mt-1 transition"
                  >
                    <User className="w-4 h-4 text-sky-600" />
                    <span>আমার প্রোফাইল</span>
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[#d03739] hover:bg-red-50 rounded-xl transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-[#d03739] rotate-180" />
                    <span>সাইন আউট</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/signin"
                className="text-sm font-semibold text-gray-700 hover:text-[#05893e] px-2 py-1.5 transition"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="text-sm font-semibold bg-[#05893e] hover:bg-[#047032] text-white px-4 py-2 rounded-xl transition shadow-sm"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ক্যাটাগরি বার */}
      <nav className="border-t border-[#e5ebe5] overflow-x-auto scrollbar-none py-2 bg-[#fafcfa]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-6 text-xs sm:text-sm font-medium">
          {CATEGORIES.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-1.5 transition py-1 ${
                  isActive
                    ? 'text-[#05893e] font-bold border-b-2 border-[#05893e]'
                    : 'text-gray-700 hover:text-[#05893e]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}