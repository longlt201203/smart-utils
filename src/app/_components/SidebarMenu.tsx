import { Link, Text } from "@geist-ui/core";
import NextLink from "next/link";

const menuItems = [
    {
        key: "about",
        label: "About"
    },
    {
        key: "calculator",
        label: "Calculator"
    },
    {
        key: "key3",
        label: "Label 3"
    },
    {
        key: "key4",
        label: "Label 4"
    },
];

export default function SidebarMenu() {
    return (
        <>
            {menuItems.map(item => (
                <Text>
                    <NextLink className="text-black" key={item.key} href={item.key}>
                        {item.label}
                    </NextLink>
                </Text>
            ))}
        </>
    );
}