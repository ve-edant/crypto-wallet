"use client";

import Image from "next/image";
import heroImg from "../../public/hero_img.jpg";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const router = useRouter();
  return (
    <section className="flex items-center justify-center min-h-screen bg-white px-6 py-24">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Section */}
        <div className="flex flex-col items-start justify-center w-full max-w-xl px-4 sm:px-0">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-gray-900 leading-tight tracking-tight">
            Get Easy Access to<br/>Your Crypto with<br/>
            <span className="text-emerald-500">Company Wallet</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Your all-in-one crypto wallet to send, receive, and swap digital
            assets—anytime, anywhere.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-emerald-600 transition duration-200">
              Download App Now
            </button>
            <button className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-200">
              Access From Web
            </button>
          </div>

          {/* Ratings */}
          <div className="mt-8 flex flex-col sm:flex-row gap-6 text-gray-800">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">4.7</p>
              <span className="text-sm text-gray-500">App Store Ratings</span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">4.8</p>
              <span className="text-sm text-gray-500">Google Play Ratings</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-full h-[500px]">
          <Image
            src={heroImg}
            alt="Orbix Wallet Preview"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
