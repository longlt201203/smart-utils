import { getProfile } from "@/app/_actions/auth";
import { Text } from "@geist-ui/core";
import { User } from "next-auth";
import { useEffect, useState } from "react";

export default function UserWelcome() {
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = async () => {
        const user = await getProfile();
        setUser(user);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <Text className="text-center">Welcome {user?.name}!</Text>
    );
}