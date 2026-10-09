'use client';

import React from 'react';
import Link from 'next/link';
import { toBengaliNumber } from '@/lib/utils';

export default function ProductCard({ product }) {
  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const pct = Math.abs(product.change?.pct || 0);

  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-[#fafcfa] rounded-2xl p-4 sm:p-5 border border-[#e5ebe5] hover:shadow-md transition flex flex-col justify-between group"
    >
      {/* টপ: ইমোজি বক্স + নাম ও একক */}
      <div className="flex items-start gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-[#f0f5f0] flex items-center justify-center text-2xl group-hover:scale-105 transition shrink-0">
          {product.image || '🛒'}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 group-hover:text-[#05893e] transition text-sm sm:text-base leading-snug">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            প্রতি {product.unit === 'kg' ? 'কেজি' : product.unit === 'dozen' ? 'ডজন' : product.unit === 'liter' ? 'লিটার' : 'পিস'}
          </p>
        </div>
      </div>

      {/* বটম: আজকের দাম + পার্সেন্টেজ (ফিগমার মতো কোনো ডিভাইডার দাগ নেই) */}
      <div className="mt-5 flex items-end justify-between">
        <div>
          <span className="text-[11px] text-gray-400 block leading-tight">আজকের দাম</span>
          <span className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
            {toBengaliNumber(product.today)} টাকা
          </span>
        </div>

        {/* ফিগমার স্টাইলে সরাসরি টেক্সট ব্যাজ */}
        <div className="text-xs font-semibold flex items-center gap-1">
          {isUp && (
            <span className="text-[#d03739]">
              ▲ {toBengaliNumber(pct)}%
            </span>
          )}
          {isDown && (
            <span className="text-[#1a9951]">
              ▼ {toBengaliNumber(pct)}%
            </span>
          )}
          {!isUp && !isDown && (
            <span className="text-gray-400">
              — {toBengaliNumber(pct)}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}