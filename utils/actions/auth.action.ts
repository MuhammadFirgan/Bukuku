// import { auth$ } from "../states/authState";
import { auth$ } from "../states/authState";
import { supabase } from "../SupaLegend";

export async function login(username: string, password: string) {
    const email = `${username}@mail.com`
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if(error) throw error

    return JSON.parse(JSON.stringify(data))
}

export async function logout() {
    const { error } = await supabase.auth.signOut()

    if(error) throw error

    auth$.session.set(null)
}

