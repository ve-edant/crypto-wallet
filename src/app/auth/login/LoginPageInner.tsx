// app/login/page.tsx
"use client";
import LoginButton from "@/app/Components/UI/LoginButtons";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginPageInner() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard",prompt: "select_account", });
  };

  return (
    <div className="flex max-h-screen flex-1 flex-col justify-center px-6 pb-12 lg:px-8 bg-[#f9f9f9]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
          Welcome Back!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your account
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md p-8 rounded-xl">
        {
        error === "OAuthCallback" && (
            console.log(error),
          <p className="text-red-600 text-sm text-center mb-4">
            Google sign-in failed. Please try again.
          </p>
        )}

        <LoginButton
          name="Continue with Google"
          icon={<FaGoogle />}
          onClick={handleSignIn}
          provider="google"
        />
      </div>
    </div>
  );
}
