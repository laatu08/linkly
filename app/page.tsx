import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen min-h-screen bg-gradient-to-b from-blue-800 to-amber-300 flex flex-col items-center justify-center px-4 text-center">

      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
        Simple Link Tracker
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-6">
        Shorten your URLs and track every click — free, fast, and privacy-respecting.
      </p>
      <Link
        href="/dashboard"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg transition"
      >
        Get Started
      </Link>
      <div className="mt-10 text-sm text-gray-500">
        Built with ❤️ using Next.js, Tailwind, and MongoDB
      </div>
    </main>
  );
}
