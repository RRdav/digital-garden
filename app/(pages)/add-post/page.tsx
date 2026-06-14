"use client"
import CloudinaryUpload from "@/app/components/CldUploadWidget";
import Tiptap from "@/app/components/Tiptap";
import { useAddPost } from "@/app/hooks/usePosts";

// Tiptap
import { useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { useState } from "react";


export default function CreatePost(){

    // Setters
    const [hasGallery, setHasGallery] = useState(false)
    const [imageArray, setImage] = useState<{url: string; publicId: string}[]>([])

    // TipTap initialise
    const editor = useEditor({ extensions: [StarterKit, TextStyle, Color], immediatelyRender: false })

    // use AddPost to create supabase entry
    const { mutate: createPost, isPending } = useAddPost();
    const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        const editorJSON = editor?.getJSON()
        const galleryBool = hasGallery

        const postToCreate = {
            content: {
                text: editorJSON,
            },
            image: imageArray,
            has_gallery: galleryBool,
        }


        createPost(postToCreate);
    }
    return(
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
                <label htmlFor="content" className="text-sm font-medium">Content</label>
                <Tiptap editor={editor}/>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="image" className="text-sm font-medium">Image</label>
                <CloudinaryUpload onImageUpload={(data) => {setImage(prev=> [...prev, data])}}/>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="hasGallery" className="text-sm font-medium">Set to Gallery View?</label>
                <input type="checkbox" checked={hasGallery} onChange={(e) => {setHasGallery(e.target.checked); console.log(e.target.checked)}}/>
            </div>

            <button type="submit">
                Submit
            </button>
        </form>
    )
}