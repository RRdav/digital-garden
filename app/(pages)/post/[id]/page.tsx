import DeletePost from "@/app/components/DeletePost";
import { createClient } from "@/app/lib/supabase/server"

export default async function Post( {params,} : { params: Promise<{ id: string }> }) {
    const { id } = await params

    const supabase = createClient()

    // Make data available
    const [{data: post , error: postError},  {data: {user}}] = await Promise.all([
        (await supabase).from('posts').select().eq('id', id).single(),
        (await supabase).auth.getUser()
    ])

    if (postError) {
        console.log(postError);
    }

    if(!user){
        console.log("Not logged in")
    }


    return (
        <>
            <DeletePost id={id}/>
            <h1>Hello! { id }</h1>
        </>
    )
}
