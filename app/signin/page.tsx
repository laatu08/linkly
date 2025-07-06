"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-amber-300 px-4 pb-20">
      <h1 className="text-3xl font-bold mb-6">Sign in to LinkTracker</h1>

      <div className="space-y-4 w-full max-w-xs">
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="w-full bg-amber-800 hover:bg-black text-white py-2 rounded"
        >
          Sign in with GitHub
        </button>
      </div>
    </main>
  );
}
