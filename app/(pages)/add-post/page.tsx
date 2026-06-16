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
    const [title, setTitle] = useState("")
    const [imageArray, setImage] = useState<{url: string; publicId: string}[]>([])
    const [uploadKey, setUploadKey] = useState(0);

    // TipTap initialise
    const editor = useEditor({ extensions: [StarterKit, TextStyle, Color], immediatelyRender: false })

    // use AddPost to create supabase entry
    const { mutate: createPost, isPending } = useAddPost();
    const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        const editorJSON = editor?.getJSON()
        const galleryValue = imageArray.length >= 2 ? true : false

        const postToCreate = {
            title,
            content: {
                text: editorJSON,
            },
            image: imageArray,
            has_gallery: galleryValue,
        }

        createPost(postToCreate, {
            onSuccess: () => {
                setTitle("")
                editor?.commands.clearContent()
                setImage([])
                setUploadKey(prev => prev + 1);
            }
        });
    }
    return(
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="content" className="text-sm font-medium">Content</label>
                <Tiptap editor={editor}/>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="image" className="text-sm font-medium">Image</label>
                <CloudinaryUpload key={uploadKey} onImageUpload={(data) => {setImage(prev=> [...prev, data])}}/>
            </div>

            <button type="submit">
                Submit
            </button>
        </form>
    )
}