import UserWelcome from "@/app/_components/UserWelcome";
import { Page, Text } from "@geist-ui/core";
import { User } from "@prisma/client";

export default function PageHeader({ user }: { user?: User | null }) {
  return (
    <Page.Header>
      <Text h2 className="text-center">
        Smart Utils
      </Text>
      {user && <UserWelcome user={user} />}
    </Page.Header>
  );
}
