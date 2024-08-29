import { MessageItemProps } from "@/app/(main)/chat/_types";

export default function MessageItem(props: MessageItemProps) {
    return (
        // wrapper
        <div className="flex" style={{ flexDirection: props.position == "left" ? "row" : "row-reverse" }}>
            {/** main */}
            <div className="min-w-60 max-w-80 shadow px-2 py-1 rounded">
                <p className="m-0 font-bold" style={{ textAlign: props.position == "left" ? "left" : "right" }}>Name</p>
                <p className="m-0" style={{ textAlign: props.position == "left" ? "left" : "right" }}>This is content. ioerjgoergjeiorjgioerojgioerjiwewegwewefwefwefwefwefwefwefwefweffwefogjoperjgoerogjo jiwehfuiwehiofhweifhioweiofhjwe weofh owehofh woh owe</p>
            </div>
        </div>
    );
}