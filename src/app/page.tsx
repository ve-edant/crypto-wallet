"use client";

import Image from "next/image";
import heroImg from "../../public/hero_img.jpg";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const router = useRouter();
  return (
    <section className="flex items-center justify-center max-h-screen bg-[#fafafa] px-6 py-24">
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
            <button onClick={() => router.push('/dashboard')} className="border border-gray-300 px-6 py-3 rounded-lg font-medium bg-emerald-300 hover:bg-emerald-500 cursor-pointer transition duration-200">
              Get Started
            </button>
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
