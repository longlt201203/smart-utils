"use client";

import ChatInput from "@/app/(main)/chat/_components/ChatInput";
import MessageList from "@/app/(main)/chat/_components/MessageList";
import { MessageListDataItem } from "@/app/(main)/chat/_types";
import {
  clearChat,
  getChat,
  getGeminiResponseText,
  pushChat,
} from "@/app/_actions/chat";
import { Button, Spinner, Text } from "@geist-ui/core";
import { useEffect, useState } from "react";

const firstMessage: MessageListDataItem = {
  name: "Chat",
  content: "Hello! How can I help you!",
};

export default function ChatPage() {
  const [chat, setChat] = useState<MessageListDataItem[]>([firstMessage]);
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const fetchChat = async () => {
    const data = await getChat();
    setChat([
      firstMessage,
      ...data.map((item) => ({ name: item.name, content: item.content })),
    ]);
    setChatHistory(data.map((item) => item.content));
  };

  const handleSendMessage = async (message: string) => {
    const data = { name: "You", content: message };
    await pushChat(data);
    await fetchChat();
    setChat((prev) => [
      ...prev,
      {
        name: "Chat",
        content: (
          <Text>
            Getting response from Gemini...
            <Spinner />
          </Text>
        ),
      },
    ]);
    const result = await getGeminiResponseText({
      message: message,
      history: chatHistory,
    });
    await pushChat({ name: "Chat", content: result });
    await fetchChat();
  };

  const handleClearChat = async () => {
    await clearChat();
    await fetchChat();
  };

  useEffect(() => {
    fetchChat();
  }, []);

  return (
    <div className="w-full">
      <Text h2>Chat</Text>
      <div className="flex flex-col gap-3">
        <Button
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          placeholder={undefined}
          type="secondary"
          onClick={handleClearChat}
        >
          Clear Chat
        </Button>
        <MessageList data={chat} />
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
