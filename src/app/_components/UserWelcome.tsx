import { Text } from "@geist-ui/core";
import { User } from "next-auth";

export default function UserWelcome({ user }: { user: User }) {
    return (
        <Text className="text-center">Welcome {user.name}!</Text>
    );
}