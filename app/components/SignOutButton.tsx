"use client"
import { signOut } from "@/app/lib/supabase/auth"
import { User } from "@supabase/supabase-js"

export default function SignOutButton({ user }: { user: User | null }) {
    if (!user) return null

    return (
        <button onClick={() => signOut()}>
            Sign out
        </button>
    )
}
