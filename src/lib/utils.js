import fallbackProducts from './products-data.json';

// ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর
export function toBengaliNumber(num) {
  if (num === null || num === undefined) return '';
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[parseInt(digit, 10)]);
}

// আজকের বাংলা তারিখ ফরম্যাট (যেমন: মঙ্গলবার, ৭ অক্টোবর, ২০২৬)
export function getBengaliDate() {
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  
  // বাংলাদেশ সময় (UTC+6) অনুযায়ী সার্ভার ও ক্লায়েন্টে একই তারিখ নিশ্চিত করা
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
  const dayName = days[now.getDay()];
  const dateBn = toBengaliNumber(now.getDate());
  const monthName = months[now.getMonth()];
  const yearBn = toBengaliNumber(now.getFullYear());

  return `${dayName}, ${dateBn} ${monthName}, ${yearBn}`;
}

// API বেস ইউআরএল (প্রোগ্রামিং হিরোর নতুন অফিশিয়াল এপিআই)
export const BASE_API_URL = 'https://openapi.programming-hero.com/api/bazardor';
export const ALT_API_URL = 'https://api.api-store.workers.dev/api/bazardor';

// সব পণ্য ফেচ করার ফাংশন (API ফেইল বা রেট লিমিট 429 হলে লোকাল ডাটা ব্যবহার করবে)
export async function fetchProducts(category = null) {
  try {
    const url = category 
      ? `${BASE_API_URL}/products?category=${category}` 
      : `${BASE_API_URL}/products`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {}

  try {
    const altUrl = category 
      ? `${ALT_API_URL}/products?category=${category}` 
      : `${ALT_API_URL}/products`;
    const res = await fetch(altUrl, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {}

  // যদি দুটো এপিআই থেকেই এরর বা 429 রেট লিমিট আসে, তাহলে লোকাল ডাটা রিটার্ন করব
  if (category) {
    return fallbackProducts.filter((p) => p.category === category);
  }
  return fallbackProducts;
}

// ক্যাটাগরি ফেচ করার ফাংশন
export async function fetchCategories() {
  try {
    const res = await fetch(`${BASE_API_URL}/categories`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {}

  try {
    const res = await fetch(`${ALT_API_URL}/categories`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch {}

  return [
    { slug: 'chal', nameBn: 'চাল', icon: '🍚' },
    { slug: 'dal', nameBn: 'ডাল', icon: '🫘' },
    { slug: 'tel', nameBn: 'তেল', icon: '🫙' },
    { slug: 'sobji', nameBn: 'সবজি', icon: '🥬' },
    { slug: 'mach', nameBn: 'মাছ', icon: '🐟' },
    { slug: 'mangsho', nameBn: 'মাংস', icon: '🍗' },
    { slug: 'dim-dui', nameBn: 'ডিম-দুধ', icon: '🥛' },
    { slug: 'mosla', nameBn: 'মসলা', icon: '🌶️' },
  ];
}

// একক পণ্য ফেচ করার ফাংশন (id বা slug অনুযায়ী)
export async function fetchProductByIdOrSlug(slugOrId) {
  try {
    if (!isNaN(slugOrId)) {
      const res = await fetch(`${BASE_API_URL}/products/${slugOrId}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.nameBn) return data;
      }
    }
  } catch {}

  // স্লাগ অথবা ফলব্যাক থেকে খুঁজে বের করা
  const all = await fetchProducts();
  const found = all.find((p) => p.slug === slugOrId || p.id.toString() === slugOrId.toString());
  return found || null;
}