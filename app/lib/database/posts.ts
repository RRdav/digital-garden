import { createClient } from "@/app/lib/supabase/client";
import { Post } from "@/app/types/posts";

// Fetch all posts from the 'posts' table in Supabase
export async function getPosts({ limit, offset = 0 }: { limit?: number; offset?: number } = {}) {
    const supabase = createClient();
    let query = supabase.from('posts').select('*');

    if (limit) {
        query = query.range(offset, offset + limit - 1);
    }

    const { data, error } = await query;

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
