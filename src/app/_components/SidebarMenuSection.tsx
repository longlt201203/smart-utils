import { SidebarMenuSectionProps } from "@/app/_types";
import { Text } from "@geist-ui/core";
import NextLink from "next/link"

export default function SidebarMenuSection(props: SidebarMenuSectionProps) {
    return (
        <div>
            <Text h5>{props.label}</Text>
            {props.items.filter((item) => item.authenticated == undefined || item.authenticated == props.authenticated).map((item) => (
                <Text key={item.key}>
                    <NextLink className="text-black" href={item.key}>
                        {item.label}
                    </NextLink>
                </Text>
            ))}
        </div>
    );
}