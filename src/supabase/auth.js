import { supabase } from "./client";

export async function signup(email, password, fullName, username) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw new Error(`Auth Error: ${authError.message}`);

    const userId = authData.user.id;

    const { error: dbError } = await supabase.from("users").insert({
      id: userId,
      username,
      full_name: fullName,
    });

    if (dbError) throw new Error(`Database Error: ${dbError.message}`);

    return { success: true };
  } catch (error) {
    console.error("Signup Error:", error.message);
    return { success: false, message: error.message };
  }
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
