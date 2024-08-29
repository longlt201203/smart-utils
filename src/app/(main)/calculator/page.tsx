"use client"

import Calculator from "@/app/(main)/calculator/_components/Calculator";
import { Text } from "@geist-ui/core";

export default function CalculatorPage() {
    return (
        <div className="w-full">
            <Text h2>Calculator</Text>
            <Calculator/>
        </div>
    );
}