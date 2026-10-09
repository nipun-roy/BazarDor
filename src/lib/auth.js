import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/bazardor";
const client = new MongoClient(uri);
const db = client.db("bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined),
  rateLimit: {
    enabled: false, // টেস্টিং ও মূল্যায়নের সুবিধার্থে রেট লিমিট শিথিল করা হলো
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://bazar-dor-bay.vercel.app",
    (req) => {
      const origin = req?.headers?.get?.("origin") || req?.headers?.get?.("referer") || "";
      return origin.includes("localhost") || origin.includes(".vercel.app");
    },
  ],
  advanced: {
    disableOriginCheck: true, // Vercel প্রিভিউ ডোমেন এবং লোকালহোস্টে 403 ফর্বিডেন প্রতিরোধ করবে
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
});