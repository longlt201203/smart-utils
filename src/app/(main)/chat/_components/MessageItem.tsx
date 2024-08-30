import { MessageItemProps } from "@/app/(main)/chat/_types";
import { Card } from "@geist-ui/core";
import MDEditor from "@uiw/react-md-editor";

export default function MessageItem(props: MessageItemProps) {
    return (
        // wrapper
        <div className="flex" style={{ flexDirection: props.position == "left" ? "row" : "row-reverse" }}>
            {/** main */}
            <Card hoverable shadow style={{ minWidth: "40%", maxWidth: "80%" }}>
                <p className="m-0 font-bold" style={{ textAlign: props.position == "left" ? "left" : "right" }}>{props.name}</p>
                {typeof props.content === "string" ? props.content.split("\n").map((item, index) => (
                    <p key={index} className="m-0" style={{ textAlign: props.position == "left" ? "left" : "right" }}>{item ? item : <br/>}</p>
                )) : props.content}
                {/* {typeof props.content === "string" ? (<MDEditor.Markdown source={props.content} />) : props.content} */}
            </Card>
        </div>
    );
}