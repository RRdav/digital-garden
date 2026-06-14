import { createClient } from "@/app/lib/supabase/client"

export default async function Post( {params,} : { params: Promise<{ id: string }> }) {
    const { id } = await params

    const supabase = createClient()
    const { data, error } = await supabase.from('posts').select().eq(
        'id', id
    )
    console.log(data);

    if(error) {
        console.log(error);
    }

    return (
        <h1>Hello! { id }</h1>
    )
}
