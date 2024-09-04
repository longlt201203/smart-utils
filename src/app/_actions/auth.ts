"use server";

import { PrismaSingleton } from "@/prisma";
import { GoogleTokenResponse } from "./_types";

const prisma = PrismaSingleton.getClient();

const ENDPOINT_GOOGLE_OAUTH2 = "https://accounts.google.com/o/oauth2/v2/auth";
const ENDPOINT_GOOGLE_TOKEN = "https://oauth2.googleapis.com/token";
const ENDPOINT_GOOGLE_TOKEN_INFO = "https://oauth2.googleapis.com/tokeninfo";

const SCOPE_USER_INFO_EMAIL = "https://www.googleapis.com/auth/userinfo.email";
const SCOPE_USER_INFO_PROFILE =
  "https://www.googleapis.com/auth/userinfo.profile";

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
  const profile = await getGoogleProfile(idToken);
  console.log(profile);
}

export async function getProfile() {
  return await prisma.user.findFirst();
}

async function getIdToken(code: string) {
  const uri = new URL(ENDPOINT_GOOGLE_TOKEN);
  const requestBody = {
    code: code,
    client_id: process.env.GOOGLE_CLIENT_ID || "",
    client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
    redirect_uri: process.env.GOOGLE_REDIRECT_URI || "",
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
  const data = await response.json();
  return data;
}
