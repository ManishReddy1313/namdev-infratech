import { supabase } from '@/lib/supabase';

export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

export async function getUserRole(userId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 'editor';
  return (user.user_metadata?.app_role as string) || 'editor';
}

export async function signOut() {
  await supabase.auth.signOut();
}

export function isAdmin(role: string): boolean {
  return role === 'super_admin';
}

export function isEditor(role: string): boolean {
  return role === 'super_admin' || role === 'editor';
}
