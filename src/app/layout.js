import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "বাজার দর — নিত্যপণ্যের বাজারদর",
  description: "দৈনিক বাজার দরের হালনাগাদ তথ্য এক নজরে",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className="bg-[#fcfdfc] text-gray-900 min-h-screen flex flex-col antialiased"
        suppressHydrationWarning
      >
        <AuthProvider>
          <Toaster position="top-center" />
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}