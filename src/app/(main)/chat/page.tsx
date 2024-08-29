"use client"

import MessageList from "@/app/(main)/chat/_components/MessageList";
import { Text } from "@geist-ui/core";

export default function ChatPage() {
    return (
        <div className="w-full">
            <Text h2>Chat</Text>
            <MessageList/>
        </div>
    )
}