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
  
  const now = new Date();
  const dayName = days[now.getDay()];
  const dateBn = toBengaliNumber(now.getDate());
  const monthName = months[now.getMonth()];
  const yearBn = toBengaliNumber(now.getFullYear());

  return `${dayName}, ${dateBn} ${monthName}, ${yearBn}`;
}

// API বেস ইউআরএল
export const BASE_API_URL = 'https://api.api-store.workers.dev/api/bazardor';
export const ALT_API_URL = 'https://api.abcz.workers.dev/api/bazardor';

// সব পণ্য ফেচ করার ফাংশন (ফলব্যাক সহ)
export async function fetchProducts(category = null) {
  try {
    const url = category 
      ? `${BASE_API_URL}/products?category=${category}` 
      : `${BASE_API_URL}/products`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch {
    // ফলব্যাক ট্রাই
    const altUrl = category 
      ? `${ALT_API_URL}/products?category=${category}` 
      : `${ALT_API_URL}/products`;
    const res = await fetch(altUrl, { next: { revalidate: 60 } });
    return await res.json();
  }
}

// ক্যাটাগরি ফেচ করার ফাংশন
export async function fetchCategories() {
  try {
    const res = await fetch(`${BASE_API_URL}/categories`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch {
    const res = await fetch(`${ALT_API_URL}/categories`, { next: { revalidate: 3600 } });
    return await res.json();
  }
}

// একক পণ্য ফেচ করার ফাংশন (id বা slug অনুযায়ী)
export async function fetchProductByIdOrSlug(slugOrId) {
  // যদি সরাসরি সংখ্যা আইডি হয়
  if (!isNaN(slugOrId)) {
    const res = await fetch(`${BASE_API_URL}/products/${slugOrId}`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  }

  // যদি slug নাম হয়, সব প্রোডাক্ট থেকে খুঁজে বের করি
  const all = await fetchProducts();
  const found = all.find((p) => p.slug === slugOrId || p.id.toString() === slugOrId.toString());
  if (found) {
    const res = await fetch(`${BASE_API_URL}/products/${found.id}`, { cache: 'no-store' });
    if (res.ok) return await res.json();
    return found;
  }
  return null;
}