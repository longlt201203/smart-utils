"use client";

import PageFooter from "@/app/_components/PageFooter";
import PageHeader from "@/app/_components/PageHeader";
import Sidebar from "@/app/_components/Sidebar";
import { Grid, Page } from "@geist-ui/core";
import { PropsWithChildren, useEffect, useState } from "react";
import { User } from "@prisma/client";
import { authenticated } from "../_actions/auth";
import { useAuth } from "../_contexts/AuthContext";

export default function MainLayout({ children }: PropsWithChildren) {
  const { profile } = useAuth();

  return (
    <Page>
      <PageHeader user={profile} />
      <Page.Content>
        <Grid.Container gap={2} justify="center">
          <Grid xs={6}>
            <Sidebar authenticated={profile ? true : false} />
          </Grid>
          <Grid xs={18}>{children}</Grid>
        </Grid.Container>
      </Page.Content>
      <PageFooter />
    </Page>
  );
}
