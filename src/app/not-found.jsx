import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-6xl mb-4">🛒</span>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">পৃষ্ঠাটি পাওয়া যায়নি (৪০৪)</h1>
      <p className="text-sm text-gray-500 max-w-sm mb-6">
        আপনি যে পৃষ্ঠাটি খুঁজছেন তা সরানো হয়েছে অথবা এর ঠিকানা ভুল হতে পারে।
      </p>
      <Link
        href="/"
        className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}