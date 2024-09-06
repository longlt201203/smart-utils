"use server";

import { PrismaSingleton } from "@/prisma";
import { GoogleTokenInfoResponse, GoogleTokenResponse, TokenPair } from "./_types";
import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const prisma = PrismaSingleton.getClient();

const ENDPOINT_GOOGLE_OAUTH2 = "https://accounts.google.com/o/oauth2/v2/auth";
const ENDPOINT_GOOGLE_TOKEN = "https://oauth2.googleapis.com/token";
const ENDPOINT_GOOGLE_TOKEN_INFO = "https://oauth2.googleapis.com/tokeninfo";

const SCOPE_USER_INFO_EMAIL = "https://www.googleapis.com/auth/userinfo.email";
const SCOPE_USER_INFO_PROFILE =
  "https://www.googleapis.com/auth/userinfo.profile";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
const APP_BASE_URL = process.env.APP_BASE_URL || "";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "";

export async function getLoginGoogleUri() {
  const uri = new URL(ENDPOINT_GOOGLE_OAUTH2);
  const searchParams = {
    client_id: process.env.GOOGLE_CLIENT_ID || "",
    redirect_uri: process.env.GOOGLE_REDIRECT_URI || "",
    scope: [SCOPE_USER_INFO_EMAIL, SCOPE_USER_INFO_PROFILE].join(" "),
    response_type: "code",
  };
  for (const [key, value] of Object.entries(searchParams)) {
    uri.searchParams.set(key, value);
  }
  return uri.toString();
}

export async function loginGoogle(code: string) {
  const idToken = await getIdToken(code);
  const googleProfile = await getGoogleProfile(idToken);
  const profile = (await prisma.user.findFirst({ where: { email: googleProfile.email } })) as User;
  if (!profile) throw new Error("User not found!");
  const { accessToken, refreshToken } = signTokenPair(profile.id);
  const cookieStore = cookies();
  cookieStore.set(accessToken, "accessToken");
  cookieStore.set(refreshToken, "refreshToken");
  redirect("/");
}

function signTokenPair(userId: number): TokenPair {
  const accessToken = jwt.sign({}, ACCESS_TOKEN_SECRET, {
    subject: String(userId),
    issuer: APP_BASE_URL,
  });

  const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, {
    subject: String(userId),
    issuer: APP_BASE_URL
  });

  return { accessToken, refreshToken };
}

export async function getProfile() {
  const profile = await authenticated();
  return profile;
}

async function getIdToken(code: string) {
  const uri = new URL(ENDPOINT_GOOGLE_TOKEN);
  const requestBody = {
    code: code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_REDIRECT_URI,
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

function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET, {
    issuer: APP_BASE_URL,
  })
}

function verifyRefreshToken(token: string) {
  
}

function refreshToken() {

}

export async function authenticated() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  return await prisma.user.findFirst();
}