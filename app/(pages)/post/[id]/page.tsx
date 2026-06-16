import DeletePost from "@/app/components/DeletePost";
import TiptapRenderer from "@/app/components/TiptapRenderer";
import { createClient } from "@/app/lib/supabase/server"
import Image from "next/image";

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const [{ data: post, error: postError }, { data: { user } }] = await Promise.all([
        supabase.from('posts').select().eq('id', id).single(),
        supabase.auth.getUser()
    ])

    if (postError) {
        console.log(postError)
        return <p>Post not found.</p>
    }

    const images: { url: string; publicId: string }[] = Array.isArray(post.image) ? post.image : post.image ? [post.image] : []

    return (
        <article className="max-w-2xl mx-auto py-10 px-4 flex flex-col gap-6">

            <header className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">{post.title}</h1>
                <time className="text-sm text-zinc-400">
                    {new Date(post.created_at).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
            </header>

            {images.length > 0 && (
                <div className={`grid gap-2 ${post.has_gallery ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {images.map((img) => (
                        <div key={img.publicId} className="relative aspect-square w-full overflow-hidden rounded">
                            <Image src={img.url} alt="" fill className="object-cover" />
                        </div>
                    ))}
                </div>
            )}

            <div className="prose prose-invert max-w-none">
                <TiptapRenderer content={post.content.text} />
            </div>

            {user && (
                <footer className="border-t border-zinc-700 pt-4">
                    <DeletePost id={id} />
                </footer>
            )}

        </article>
    )
}
