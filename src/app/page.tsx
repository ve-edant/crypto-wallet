"use client";

import { useRouter } from "next/navigation";

export default function Homepage() {
  const router = useRouter();
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 py-24 text-center">
      <div className="max-w-3xl space-y-6 transition-all duration-1000 ease-out animate-slide-up">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight font-sans">
          Secure & Seamless Crypto Wallet
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Store, send, swap & grow your crypto in one powerful wallet.
        </p>
        <button onClick={() => router.push('/dashboard')} className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-300">
          Get Started
        </button>
      </div>
    </section>
  );
}
