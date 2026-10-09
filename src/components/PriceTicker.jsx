'use client';

import React from 'react';
import { toBengaliNumber } from '@/lib/utils';

export default function PriceTicker({ products = [] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="bg-[#fafcfa] border-y border-[#e5ebe5] overflow-hidden whitespace-nowrap py-2 text-xs select-none">
      <div className="flex animate-marquee gap-8 w-max">
        {[...products, ...products].map((item, idx) => {
          const isUp = item.change?.dir === 'up';
          const isDown = item.change?.dir === 'down';
          const pct = Math.abs(item.change?.pct || 0);

          return (
            <div key={`${item.id}-${idx}`} className="inline-flex items-center gap-2 text-gray-700">
              <span>{item.image}</span>
              <span className="font-semibold text-gray-800">{item.nameBn}</span>
              <span>{toBengaliNumber(item.today)} টাকা/{item.unit === 'kg' ? 'কেজি' : item.unit}</span>
              <span
                className={`font-semibold inline-flex items-center ${
                  isUp ? 'text-[#d03739]' : isDown ? 'text-[#1a9951]' : 'text-gray-400'
                }`}
              >
                {isUp ? '▲' : isDown ? '▼' : '—'} {toBengaliNumber(pct)}%
              </span>
              <span className="text-gray-300 ml-4">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}