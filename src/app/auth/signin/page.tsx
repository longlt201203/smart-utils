"use client";

import { Display, Divider, Page, Text } from "@geist-ui/core";
import SignInForm from "./_components/SignInForm";
import OtherLoginSection from "./_components/OtherLoginSection";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { loginGoogle } from "@/app/_actions/auth";

export default function SignInPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogingIn, setIsLogingIn] = useState(false);
  const query = useSearchParams();

  const login = async (code: string) => {
    setIsLogingIn(true);
    try {
      await loginGoogle(code);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLogingIn(false);
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const code = query.get("code");
      if (code) login(code);
    }
  }, [isLoaded]);

  return (
    <Page className="flex flex-col align-middle justify-center">
      <Page.Content>
        <Display shadow>
          <div className="p-8 flex flex-col gap-4">
            <Text h2>Sign In</Text>
            <SignInForm isLogingIn={isLogingIn} />
            <Divider>Or</Divider>
            <OtherLoginSection disabled={isLogingIn} />
          </div>
        </Display>
      </Page.Content>
    </Page>
  );
}
