import SidebarMenu from "@/app/_components/SidebarMenu";
import { SidebarMenuSectionProps } from "@/app/_types";

const sidebarData: SidebarMenuSectionProps[] = [
    {
        key: "menu",
        label: "Menu",
        items: [
            {
                key: "about",
                label: "About"
            },
            {
                key: "calculator",
                label: "Calculator"
            },
            {
                key: "code-helper",
                label: "Code Helper"
            },
            {
                key: "md-editor",
                label: "Markdown Editor"
            },
            {
                key: "chat",
                label: "Chat"
            }
        ]
    },
    {
        key: "authentication",
        label: "Authentication",
        items: [
            {
                key: "api/auth/signin",
                label: "Login"
            },
            {
                key: "api/auth/signout",
                label: "Logout"
            }
        ]
    }
];

export default function Sidebar() {
    return (
        <div>
            <SidebarMenu data={sidebarData} />
        </div>
    );
}