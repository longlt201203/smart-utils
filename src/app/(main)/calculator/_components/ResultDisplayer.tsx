"use client"

import { Input } from "@geist-ui/core";

export default function ResultDisplayer({
    result
}: {
    result?: string;
}) {
    return (
        <Input
            value={result}
            width="100%"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            scale={4/3}
            placeholder="Result here"
            readOnly />
    );
}