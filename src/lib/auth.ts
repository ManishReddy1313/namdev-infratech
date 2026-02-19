import { cookies } from 'next/headers';
import { query, queryOne } from './db';
import bcrypt from 'bcryptjs';

const SESSION_COOKIE = 'admin_session';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export interface AdminUser {
  id: string;
  username: string;
  role: string;
}

export async function login(username: string, password: string): Promise<{ user: AdminUser; sessionId: string } | null> {
  const user = await queryOne<{ id: string; username: string; password_hash: string; role: string }>(
    'SELECT id, username, password_hash, role FROM admin_users WHERE username = $1',
    [username]
  );
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return null;

  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const session = await queryOne<{ id: string }>(
    'INSERT INTO sessions (user_id, expires_at) VALUES ($1, $2) RETURNING id',
    [user.id, expiresAt]
  );
  if (!session) return null;

  return { user: { id: user.id, username: user.username, role: user.role }, sessionId: session.id };
}

export async function getSession(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const result = await queryOne<{ user_id: string; username: string; role: string }>(
    `SELECT s.user_id, u.username, u.role FROM sessions s 
     JOIN admin_users u ON s.user_id = u.id 
     WHERE s.id = $1 AND s.expires_at > NOW()`,
    [sessionId]
  );
  if (!result) return null;

  return { id: result.user_id, username: result.username, role: result.role };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (sessionId) {
    await query('DELETE FROM sessions WHERE id = $1', [sessionId]);
  }
  cookieStore.delete(SESSION_COOKIE);
}

export function setSessionCookie(sessionId: string) {
  return {
    name: SESSION_COOKIE,
    value: sessionId,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_DURATION_MS / 1000,
  };
}

export function isAdmin(role: string): boolean {
  return role === 'super_admin';
}

export function isEditor(role: string): boolean {
  return role === 'super_admin' || role === 'editor';
}
