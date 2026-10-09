import React from "react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import PriceTicker from "@/components/PriceTicker";
import { fetchProducts, toBengaliNumber, getBengaliDate } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const rawProducts = await fetchProducts();
  const products = Array.isArray(rawProducts) ? rawProducts : [];

  // আজ দাম বেড়েছে (Top 6 Risers)
  const risers = [...products]
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  // আজ দাম কমেছে (Top 6 Fallers)
  const fallers = [...products]
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (a.change?.pct || 0) - (b.change?.pct || 0))
    .slice(0, 6);

  return (
    <div>
      {/* প্রাইস টিকার */}
      <PriceTicker products={products} />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* হিরো ব্যানার */}
        <section className="bg-[#fafcfa] rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#e5ebe5] shadow-sm">
          <div className="max-w-xl space-y-4">
            <span className="inline-block bg-[#e6f4ea] text-[#05893e] text-xs font-semibold px-3.5 py-1 rounded-full border border-[#c6e7ce]">
              {getBengaliDate()}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <div className="pt-2">
              <a
                href="#সব-পণ্য"
                className="inline-block bg-[#05893e] hover:bg-[#047032] text-white font-semibold text-sm px-6 py-3 rounded-xl transition shadow-sm"
              >
                সব পণ্য দেখুন
              </a>
            </div>
          </div>

          <div className="relative w-64 h-56 shrink-0">
            <Image
              src="/bazar-hero.png"
              alt="বাজার দর"
              fill
              sizes="256px"
              className="object-contain"
              priority
            />
          </div>
        </section>

        {/* সেকশন A: আজ দাম বেড়েছে */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[#d03739] font-bold text-lg">▲</span>
            <h2 className="text-lg font-bold text-gray-900">আজ দাম বেড়েছে</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {risers.map((item) => (
              <ProductCard key={`riser-${item.id}`} product={item} />
            ))}
          </div>
        </section>

        {/* সেকশন B: আজ দাম কমেছে */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[#1a9951] font-bold text-lg">▼</span>
            <h2 className="text-lg font-bold text-gray-900">আজ দাম কমেছে</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fallers.map((item) => (
              <ProductCard key={`faller-${item.id}`} product={item} />
            ))}
          </div>
        </section>

        {/* সেকশন C: সব পণ্য */}
        <section id="সব-পণ্য" className="space-y-4 pt-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((item) => (
              <ProductCard key={`all-${item.id}`} product={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}