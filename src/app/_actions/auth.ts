"use server";

import { PrismaSingleton } from "@/prisma";
import {
  GoogleTokenInfoResponse,
  GoogleTokenResponse,
  TokenPair,
} from "./_types";
import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Env } from "@/env";

const prisma = PrismaSingleton.getClient();

const ENDPOINT_GOOGLE_OAUTH2 = "https://accounts.google.com/o/oauth2/v2/auth";
const ENDPOINT_GOOGLE_TOKEN = "https://oauth2.googleapis.com/token";
const ENDPOINT_GOOGLE_TOKEN_INFO = "https://oauth2.googleapis.com/tokeninfo";

const SCOPE_USER_INFO_EMAIL = "https://www.googleapis.com/auth/userinfo.email";
const SCOPE_USER_INFO_PROFILE =
  "https://www.googleapis.com/auth/userinfo.profile";

export async function redirectLoginGoogle() {
  const uri = new URL(ENDPOINT_GOOGLE_OAUTH2);
  const searchParams = {
    client_id: Env.GOOGLE_CLIENT_ID,
    redirect_uri: Env.GOOGLE_REDIRECT_URI,
    scope: [SCOPE_USER_INFO_EMAIL, SCOPE_USER_INFO_PROFILE].join(" "),
    response_type: "code",
  };
  for (const [key, value] of Object.entries(searchParams)) {
    uri.searchParams.set(key, value);
  }
  redirect(uri.toString());
}

export async function loginGoogle(code: string) {
  const idToken = await getIdToken(code);
  const googleProfile = await getGoogleProfile(idToken);
  const profile = (await prisma.user.findFirst({
    where: { email: googleProfile.email },
  })) as User;
  if (!profile) throw new Error("User not found!");
  const { accessToken, refreshToken } = signTokenPair(profile.id);
  const cookieStore = cookies();
  cookieStore.set("accessToken", accessToken);
  cookieStore.set("refreshToken", refreshToken);
  redirect("/");
}

function signTokenPair(userId: number): TokenPair {
  const accessToken = jwt.sign({}, Env.ACCESS_TOKEN_SECRET, {
    subject: String(userId),
    issuer: Env.APP_BASE_URL,
    expiresIn: Env.ACCESS_TOKEN_EXPIRES_AT,
  });

  const refreshToken = jwt.sign({}, Env.REFRESH_TOKEN_SECRET, {
    subject: String(userId),
    issuer: Env.APP_BASE_URL,
    expiresIn: Env.REFRESH_TOKEN_EXPIRES_AT,
  });

  return { accessToken, refreshToken };
}

async function getIdToken(code: string) {
  const uri = new URL(ENDPOINT_GOOGLE_TOKEN);
  const requestBody = {
    code: code,
    client_id: Env.GOOGLE_CLIENT_ID,
    client_secret: Env.GOOGLE_CLIENT_SECRET,
    redirect_uri: Env.GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  };
  const response = await fetch(uri, {
    method: "POST",
    body: JSON.stringify(requestBody),
  });
  if (response.status >= 400) throw new Error("Login Google Failed!");
  const data = (await response.json()) as GoogleTokenResponse;
  if (!data.id_token) throw new Error("ID Token Not Found!");
  return data.id_token;
}

async function getGoogleProfile(idToken: string) {
  const uri = new URL(ENDPOINT_GOOGLE_TOKEN_INFO);
  uri.searchParams.set("id_token", idToken);
  const response = await fetch(uri);
  const data = (await response.json()) as GoogleTokenInfoResponse;
  return data;
}

async function verifyAccessToken(token: string) {
  let profile: User | null = null;
  try {
    const payload = jwt.verify(token, Env.ACCESS_TOKEN_SECRET, {
      issuer: Env.APP_BASE_URL,
    });
    const sub = typeof payload === "string" ? null : payload.sub;
    if (sub)
      profile = await prisma.user.findUnique({ where: { id: parseInt(sub) } });
  } catch (err) {
    console.log(err);
  }
  return profile;
}

async function verifyRefreshToken(token: string) {
  let profile: User | null = null;
  try {
    const payload = jwt.verify(token, Env.REFRESH_TOKEN_SECRET, {
      issuer: Env.APP_BASE_URL,
    });
    const sub = typeof payload === "string" ? null : payload.sub;
    if (sub)
      profile = await prisma.user.findUnique({ where: { id: parseInt(sub) } });
  } catch (err) {
    console.log(err);
  }
  return profile;
}

async function refreshToken() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken");
  if (!refreshToken) return null;
  const profile = await verifyRefreshToken(refreshToken.value);
  if (profile) {
    const { accessToken, refreshToken } = signTokenPair(profile.id);
    cookieStore.set("accessToken", accessToken);
    cookieStore.set("refreshToken", refreshToken);
  }
  return profile;
}

export async function authenticated() {
  console.log("Call authenticated");
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) return null;
  const profile = await verifyAccessToken(accessToken.value);
  return profile ? profile : refreshToken();
}
