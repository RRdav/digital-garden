"use client";

import Image from "next/image";
import CloudinaryUpload from "./components/CldUploadWidget";
import { getPosts, addPost } from "./lib/database/posts";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { usePosts, useAddPost } from "./hooks/usePosts";

const samplePost = {
    content: {
      text: "This is a sample post with an image.",
    },
    image: {
      url: "https://res.cloudinary.com/dxxqmd55w/image/upload/v1700000000/sample.jpg",
      alt: "Sample Image",
    },
    has_gallery: false,
}

const testURL = "https://jsonplaceholder.typicode.com/posts"
const sampleInfiniteURL = "https://dummyjson.com/users?limit=5&skip="

// This is for just general testing of fetching data
// async function fetchPosts() {
//   const res = await fetch(testURL);
//   if (!res.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return res.json();
// }

async function fetchUsers({ pageParam = 0 }) {
  const res = await fetch(`${sampleInfiniteURL}${pageParam}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
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
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: fetchUsers,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      if (nextSkip >= lastPage.total) {
        return undefined; // No more pages to fetch
      }

      return nextSkip; // Return the next skip value for the next page
    },
  })

  const { data: postsData, error: postsError, isLoading: postsLoading } = usePosts();
  const { mutate: createPost, isPending } = useAddPost();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-6xl font-bold text-center">Welcome to the GoonetteHub!</h1>

         {(console.log("Posts Data:", postsData), null)}

         {/* Test Infinite Query */}
          <h2>Test Infinite Query</h2>

          {status === 'pending' ? (<p>Loading...</p>) : status === 'error' ? (<p>Error: {error.message}</p> ) : (
            <>
              {data.pages.map((group, i) => (
                <div key={i}>
                  {group.users.map((user: any) => (
                    <p key={user.id}>{user.firstName} {user.lastName}</p>
                  ))}
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

          {/* <h2>Test Pull TanStack</h2>
          <ul>
            {data.map((post: any) => {
              return <li key={post.id}>{post.title}</li>
            })}
          </ul> */}

          {/* <CloudinaryUpload /> */}

          {/* Sample get and add post buttons */}
          <button
            onClick = {() => {
              createPost(samplePost);
            }}
          >
            {isPending ? "Adding Post..." : "Add Sample Post"}
          </button>

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
