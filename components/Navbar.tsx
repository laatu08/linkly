"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <nav className="w-full bg-gray-900 text-white p-4 px-20 flex justify-between items-center">
      <h1
        onClick={() => router.push("/")}
        className="text-xl font-bold cursor-pointer hover:text-blue-400 transition"
      >
        LINKLY
      </h1>

      <div>
        {session ? (
          <div className="flex items-center gap-3">
            <span className="text-sm">{session.user?.name}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded bg-white text-black cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="px-3 py-1 rounded bg-white text-black cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
