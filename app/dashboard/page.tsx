"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import LinkCard from "@/components/LinkCard";

type Link = {
  originalUrl: string;
  shortCode: string;
  clickCount: number;
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [links, setLinks] = useState<Link[]>([]);

  const fetchLinks = async () => {
    const res = await fetch("/api/links/user");
    const data = await res.json();
    if (data.links) setLinks(data.links);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/links/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await res.json();
    if (data.success) {
      setShortLink(`${window.location.origin}/${data.link.shortCode}`);
      setOriginalUrl("");
      fetchLinks(); // refresh list
    }
  };

  const handleDelete = (shortCode: string) => {
    setLinks((prev) => prev.filter((link) => link.shortCode !== shortCode));
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  if (!session) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center ">
        <h2 className="text-2xl font-semibold text-gray-300 mb-2">
          You’re not signed in
        </h2>
        <p className="text-gray-600 mb-4">
          Please log in to access your dashboard and manage links.
        </p>
        <button
          onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
          className="px-6 cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
        >
          Log In
        </button>
      </div>
    );
  }
  return (
    <div className="space-y-8 px-4">
      <div>
        <h2 className="text-2xl font-bold mt-4 mb-2">Create a Short Link</h2>
        <form
          onSubmit={handleSubmit}
          className="flex items-center flex-wrap md:flex-nowrap"
        >
          <input
            type="url"
            placeholder="Enter long URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="flex-1 h-12 px-4 border border-gray-600 min-w-[200px] outline-none focus:ring-0 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 h-12 bg-blue-600 text-white hover:bg-blue-700"
          >
            Create Link
          </button>
        </form>

        {shortLink && (
          <div className="mt-4">
            <p className="font-medium">Your short link:</p>
            <a
              href={shortLink}
              className="text-blue-700 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortLink}
            </a>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold">Your Links</h2>
        <div className="space-y-3 mt-4">
          {links.length > 0 ? (
            links.map((link) => (
              <LinkCard
                key={link.shortCode}
                link={link}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-sm text-gray-600">No links yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
