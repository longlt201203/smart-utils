import React from "react";

export interface MessageItemProps {
    position: "left" | "right";
    name: string;
    content: string | React.ReactNode;
}