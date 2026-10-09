import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb+srv://bazardor:ItM4gBA5ZJ8xAUwg@cluster0.dbhaiit.mongodb.net/bazardor?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const db = client.db("bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET || "bazardor_assignment_secret_key_1234567890_secure_hash",
  baseURL: process.env.BETTER_AUTH_URL || "https://bazar-dor-bay.vercel.app",
  rateLimit: {
    enabled: false,
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
    disableOriginCheck: true,
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
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