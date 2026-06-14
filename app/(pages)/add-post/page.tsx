"use client"
import Tiptap from "@/app/components/Tiptap";
import { useAddPost } from "@/app/hooks/usePosts";

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


// Await for the cloudinary public id if populated
// add to the image url

export default function CreatePost(){
    // use AddPost,
const { mutate: createPost, isPending } = useAddPost();
    return(
        <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <label htmlFor="content" className="text-sm font-medium">Content</label>
                <Tiptap />
            </div>
        </form>
    )
}