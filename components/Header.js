"use client";
import React from "react";
import { useState } from "react";

import Image from "next/image";
import { Search } from "lucide-react";

export default function Header(props) {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search
  const handleSearch = () => {
    props.searchPosts(searchTerm);
    setSearchTerm(""); // Clear the search input after searching
  };

  const handleRefresh = () => {
    props.refreshPosts();
  };

  return (
    <header className="flex items-center justify-between w-full h-20 p-4 fixed z-1000 top-0 bg-background border-b">
      <div className="flex items-center justify-center w-1/4 h-full gap-2">
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center w-1/4 h-full gap-2 cursor-pointer"
        >
          <Image
            src="/reddit.svg"
            alt="Logo"
            width={50}
            height={50}
            className="dark:invert "
            priority
          />
          <h1>RedditActu</h1>
        </button>
      </div>
      <div className="flex items-center justify-center w-2/4 h-full gap-2">
        <input
          className="w-1/2 p-2 border rounded"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="cursor-pointer" onClick={handleSearch} size={24} />
      </div>
    </header>
  );
}
