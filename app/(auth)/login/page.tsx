"use client"
import { useState } from "react"
import { signInWithEmail } from "@/app/lib/supabase/auth"

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null)
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        if ( email != 'raphaelruizd@gmail.com') {
            setError("Bro who df are you 💀")
            return
        }
        try {
            await signInWithEmail(email, password);
            window.location.href = "/";
        } catch (err) {
            setError(err instanceof Error ? err.message : "Invalid email or password")
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-sm flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold">Sign in</h1>
                    <p className="text-sm ">Enter your credentials to continue</p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                            name="email"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                            name="password"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="bg-black text-white rounded-md py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        Sign in
                    </button>
                </form>

                <p className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href="/register" className="text-blue-600 font-medium hover:underline">Sign up</a>
                </p>
            </div>
        </main>
    )
}