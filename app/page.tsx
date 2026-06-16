"use client";

import Image from "next/image";
import CloudinaryUpload from "./components/CldUploadWidget";
import { getPosts, addPost } from "./lib/database/posts";
import { Post } from "./types/posts";
import { useQuery, useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { usePosts, useAddPost } from "./hooks/usePosts";
import Link from "next/link";



const PAGE_SIZE = 5;

async function fetchPostsPage({ pageParam }: { pageParam: number }) {
  return getPosts({ limit: PAGE_SIZE, offset: pageParam });
}

export default function Home() {
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: fetchPosts,
  // })

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<Post[], Error, InfiniteData<Post[], number>, readonly unknown[], number>({
    queryKey: ['posts'],
    queryFn: fetchPostsPage,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return pages.length * PAGE_SIZE;
    },
  })

  const { data: postsData, error: postsError, isLoading: postsLoading } = usePosts();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-6xl font-bold text-center">Welcome!</h1>

         {/* Test Infinite Query */}

          {status === 'pending' ? (<p>Loading...</p>) : status === 'error' ? (<p>Error: {error.message}</p> ) : (
            <>
              {data.pages.map((group, i) => (
                <div key={i} className="flex flex-col">
                  {group.map((post) => {
                    console.log(post);
                    return(
                      <Link key={post.id}
                        href={`/post/${post.id}`}
                      >
                        {post.title ? post.title : "No title"}
                      </Link>
                    )}
                  )}
                </div>
              ))}
              <div>
                <button
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? 'Loading More...'
                    : hasNextPage ? 'Load More' : 'Nothing more to load'}
                </button>
              </div>
              <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
            </>

          )}

          <button
            onClick = {() => {
              console.log("Posts Data:", postsData);
            }}
          >
            Get Log of Posts
          </button>
      </main>
    </div>
  );
}
