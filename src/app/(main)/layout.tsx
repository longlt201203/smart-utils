"use client"

import { getProfile } from "@/app/_actions/auth";
import PageFooter from "@/app/_components/PageFooter";
import PageHeader from "@/app/_components/PageHeader";
import Sidebar from "@/app/_components/Sidebar";
import { Grid, Page } from "@geist-ui/core";
import { User } from "next-auth";
import { PropsWithChildren, useEffect, useState } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = async () => {
        const user = await getProfile();
        setUser(user);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <Page>
            <PageHeader user={user} />
            <Page.Content>
                <Grid.Container gap={2} justify="center">
                    <Grid xs={6}>
                        <Sidebar authenticated={user ? true : false} />
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