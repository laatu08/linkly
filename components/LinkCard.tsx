"use client";

import { useState } from "react";

type Link = {
  originalUrl: string;
  shortCode: string;
  clickCount: number;
};

export default function LinkCard({
  link,
  onDelete,
}: {
  link: Link;
  onDelete?: (shortCode: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const shortUrl = `${window.location.origin}/${link.shortCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch(`/api/links/${link.shortCode}`, {
      method: "DELETE",
    });

    if (res.ok && onDelete) {
      onDelete(link.shortCode);
    } else {
      alert("Failed to delete link");
    }

    setLoading(false);
  };

  return (
    <div className="border rounded p-4 flex justify-between items-center gap-4">
      <div className="flex-1">
        <a
          href={shortUrl}
          className="text-blue-700 underline break-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          {shortUrl}
        </a>
        <p className="text-sm text-gray-600 break-all">{link.originalUrl}</p>
        <p className="text-sm mt-1">Clicks: {link.clickCount}</p>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={copyToClipboard}
          className="px-3 py-1 cursor-pointer bg-gray-800 text-white text-sm rounded"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 cursor-pointer py-1 bg-red-600 text-white text-sm rounded disabled:opacity-60"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
