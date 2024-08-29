"use client"

import PageFooter from "@/app/_components/PageFooter";
import PageHeader from "@/app/_components/PageHeader";
import Sidebar from "@/app/_components/Sidebar";
import { Grid, Page } from "@geist-ui/core";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <Page>
            <PageHeader />
            <Page.Content>
                <Grid.Container gap={2} justify="center">
                    <Grid xs={6}>
                        <Sidebar/>
                    </Grid>
                    <Grid xs={18}>
                        {children}
                    </Grid>
                </Grid.Container>
            </Page.Content>
            <PageFooter/>
        </Page>
    );
}