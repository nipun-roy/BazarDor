import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb+srv://bazardor:ItM4gBA5ZJ8xAUwg@cluster0.dbhaiit.mongodb.net/bazardor?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const db = client.db("bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET || "bazardor_assignment_secret_key_1234567890_secure_hash",
  baseURL: process.env.BETTER_AUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // রিকোয়ারমেন্ট অনুযায়ী ইমেইল ভেরিফিকেশন বন্ধ রাখা হয়েছে
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