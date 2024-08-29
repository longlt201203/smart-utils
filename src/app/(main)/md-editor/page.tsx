"use client"

import { Divider, Spacer, Text } from "@geist-ui/core";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

export default function MdEditorPage() {
    const [value, setValue] = useState<string | undefined>("**Hello world!!!**");

    return (
        <div className="w-full">
            <Text h2>Markdown Editor</Text>
            <MDEditor
                value={value}
                onChange={(v) => setValue(v)}
                preview="edit"
                hideToolbar
            />
            <Spacer h={0.5} />
            <Text h5>Preview</Text>
            <Divider/>
            <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
        </div>
    );
}