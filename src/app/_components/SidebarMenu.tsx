import SidebarMenuSection from "@/app/_components/SidebarMenuSection";
import { SidebarMenuProps } from "@/app/_types";

export default function SidebarMenu(props: SidebarMenuProps) {
    return (
        <div className="flex flex-col gap-8">
            {props.data?.map((item) => (
                <SidebarMenuSection key={item.key} label={item.label} items={item.items} />
            ))}
        </div>
    );
}