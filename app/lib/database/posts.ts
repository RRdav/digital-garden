import { createClient } from "@/app/utils/supabase/client";
import { Post } from "@/app/types/posts";

// Fetch all posts from the 'posts' table in Supabase
export async function getPosts() {
    const supabase = createClient();
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
    return data as Post[];
}

// Add a new post to the 'posts' table in Supabase
export async function addPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
    const supabase = createClient();
    const { data, error } = await supabase.from('posts').insert([post]).select();
    if (error) {
        console.error("Error adding post:", error);
        return null;
    }
    return data[0] as Post;
}
