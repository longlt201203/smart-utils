import SidebarMenuSection from "@/app/_components/SidebarMenuSection";
import { SidebarMenuProps } from "@/app/_types";

export default function SidebarMenu(props: SidebarMenuProps) {
    return (
        <div className="flex flex-col gap-8">
            {props.data?.filter((item) => item.authenticated == undefined || item.authenticated == props.authenticated).map((item) => (
                <SidebarMenuSection authenticated={props.authenticated} key={item.key} label={item.label} items={item.items} />
            ))}
        </div>
    );
}