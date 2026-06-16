"use client"
import { useRouter } from "next/navigation"
import { useDeletePost } from "../hooks/usePosts"

export default function DeletePost({id} : {id: string}) {
    const router = useRouter()
    const {mutate: deletePost, isPending} = useDeletePost()

    return (
        <button onClick={() => deletePost(id, { onSuccess: () => router.push("/") })} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
        </button>
    )
}