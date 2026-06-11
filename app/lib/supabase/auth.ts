import { createClient } from "./client";

// Register a new user with email and password
export async function signUpNewUser(email: string, password: string) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })

    if (error) {
        throw error;
    }

    return data;
}

// Sign in an existing user with email and password
export async function signInWithEmail(email: string, password: string) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    if (error) {
        throw error;
    }

    console.log("success!", data)

    return data;
}

// Sign out
export async function signOut() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
}