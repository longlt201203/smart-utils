import MessageItem from "@/app/(main)/chat/_components/MessageItem";

export default function MessageList() {
    return (
        <div className="flex flex-col gap-4 p-12 border rounded-lg">
            {Array.from({ length: 5 }, (_, index) => (
                <MessageItem position={index % 2 == 0 ? "left" : "right"} />
            ))}
        </div>
    );
}