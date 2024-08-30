import { ChatInputProps } from "@/app/(main)/chat/_types";
import { Button, Textarea } from "@geist-ui/core";
import Send from '@geist-ui/icons/send'
import { useEffect, useRef, useState } from "react";

export default function ChatInput({ onSend }: ChatInputProps) {
    const [message, setMessage] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const sendMessage = () => {
        let msg = message.trim();
        if (onSend && msg) {
            onSend(msg);
            setMessage("");
        }
    }

    useEffect(() => {
        const textarea =  textareaRef.current;
        if (textarea) {
            textarea.value = message;
            textarea.setAttribute('style',`height: 0px; resize: none; overflow: hidden`);
            textarea.setAttribute('style',`height: ${textarea.scrollHeight}px; resize: none; overflow: hidden`);
        }
    }, [message]);

    return (
        <div className="p-1 rounded border flex gap-2">
            <Textarea
                ref={textareaRef}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                width="100%"
                placeholder="Input something..."
                style={{
                    resize: "none",
                    overflow: "hidden"
                }}
                onChange={(e) => {
                    setMessage(e.target.value);
                }}
                rows={1}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        e.preventDefault();
                        if (e.shiftKey) {
                            setMessage((prev) => prev + "\n");
                        } else {
                            sendMessage();
                        }
                    }
                }} />
            <Button
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                placeholder={undefined}
                icon={<Send/>}
                width="32px"
                type="secondary"
                onClick={sendMessage}></Button>
        </div>
    );
}