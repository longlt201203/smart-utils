import MessageItem from "@/app/(main)/chat/_components/MessageItem";
import { MessageListProps } from "@/app/(main)/chat/_types";

export default function MessageList({ data }: MessageListProps) {
    return (
        <div className="flex flex-col gap-4 p-12 border rounded-lg" style={{ maxHeight: "720px", overflow: "auto" }}>
            {data.map((item, index) => (
                <MessageItem key={index} position={index % 2 == 0 ? "left" : "right"} name={item.name} content={item.content} />
            ))}
        </div>
    );
}