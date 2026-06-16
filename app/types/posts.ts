
export interface Post {
    id: string;
    title: string;
    created_at: string;
    content: Record<string, any>; // Adjust based on your content data structure
    image: Record<string, any> | Record<string, any>[]; // Adjust based on your image data structure
    has_gallery: boolean;
    updated_at?: string; // Optional field for tracking updates
}