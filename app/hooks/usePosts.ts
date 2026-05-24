'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, addPost } from "@/app/lib/database/posts";
import { Post } from "@/app/types/posts";

const POSTS_QUERY_KEY = "posts";

// Custom hook to fetch posts using Query
export function usePosts() {
    return useQuery({
        queryKey: [POSTS_QUERY_KEY],
        queryFn: getPosts,
        refetchOnWindowFocus: true
    })
}

// Custom hook to add a new post using Mutation
export function useAddPost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newPost: Omit<Post, 'id' | 'created_at' | 'updated_at'>) => addPost(newPost),

        onSuccess: () => {
            // Invalidate and refetch posts after adding a new one
            queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
        },

        onError: (error) => {
            console.error("Error adding post:", error);
        }
    })
}