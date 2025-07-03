"use client";

import React from "react";
import { useState, useEffect, useTransition } from "react";

import Header from "@/components/Header";
import Card from "@/components/Card";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isPending, startTransition] = useTransition();

  //Fetch popular posts from Reddit API
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("https://www.reddit.com/r/popular.json");
      const data = await response.json();
      // Update state with fetched posts
      // Using startTransition to avoid blocking the main thread
      startTransition(() => {
        setPosts(data.data.children);
      });
    };
    fetchPosts();
  }, []);

  // Fetch posts
  const searchPosts = async (searchTerm) => {
    const response = await fetch(
      `https://www.reddit.com/search.json?q=${searchTerm}`
    );
    const data = await response.json();
    startTransition(() => {
      setPosts(data.data.children);
    });
  };

  // Refresh posts
  const refreshPosts = async () => {
    const response = await fetch("https://www.reddit.com/r/popular.json");
    const data = await response.json();
    startTransition(() => {
      setPosts(data.data.children);
    });
  };

  // Render posts
  const renderPosts = posts.map((post, i) => {
    return <Card key={i} {...post.data} />;
  });

  // Show loading state
  if (isPending) {
    return (
      <div className="flex w-screen h-screen flex-col">
        <Header searchPosts={searchPosts} refreshPosts={refreshPosts} />
        <main className="flex flex-col mt-20 items-center w-full h-full">
          <div className="flex items-center justify-center w-full h-full">
            <p>Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex w-screen h-screen flex-col">
      <Header searchPosts={searchPosts} refreshPosts={refreshPosts} />
      <main className="flex flex-col mt-20 pt-10 pb-20 items-center w-full h-full overflow-y-auto gap-4">
        {renderPosts}
      </main>
    </div>
  );
}
