import UserWelcome from "@/app/_components/UserWelcome";
import { Page, Text } from "@geist-ui/core";

export default function PageHeader() {
    return (
        <Page.Header>
            <Text h2 className="text-center">Smart Utils</Text>
            <UserWelcome/>
        </Page.Header>
    );
}