
export interface Post {
    id: string;
    user_id: string;
    title: string;
    created_at: string;
    content: Record<string, any>;
    image: Record<string, any> | Record<string, any>[];
    has_gallery: boolean;
    updated_at?: string;
}