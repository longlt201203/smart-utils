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
                label: "Chat",
                authenticated: true
            }
        ]
    },
    {
        key: "management",
        label: "Management",
        items: [],
        authenticated: true
    },
    {
        key: "authentication",
        label: "Authentication",
        items: [
            {
                key: "api/auth/signin",
                label: "Login",
                authenticated: false
            },
            {
                key: "api/auth/signout",
                label: "Logout",
                authenticated: true
            }
        ]
    }
];

export default function Sidebar({ authenticated }: { authenticated?: boolean }) {
    return (
        <div>
            <SidebarMenu authenticated={authenticated}  data={sidebarData} />
        </div>
    );
}