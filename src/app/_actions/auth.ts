"use server"

import { auth } from "@/auth"

export async function getProfile() {
    const session = await auth();
    if (!session?.user) return null;
    return session.user;
}