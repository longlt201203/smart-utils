"use client"

import CheatSheet from "@/app/(main)/calculator/_components/CheatSheet";
import FormulaInput from "@/app/(main)/calculator/_components/FormulaInput";
import FuntionCode from "@/app/(main)/calculator/_components/FunctionCode";
import ResultDisplayer from "@/app/(main)/calculator/_components/ResultDisplayer";
import { Spacer, Text } from "@geist-ui/core";
import { useState } from "react";

export default function Calculator() {
    const [formula, setFormula] = useState<string>("");
    const [result, setResult] = useState<string>("");

    const calculate = (formula: string) => {
        if (formula) {
            try {
                const regex = /^[0-9e+\-*/%().\s]+$/;
                if (!regex.test(formula)) {
                    throw new Error("Invalid formula!");
                }
                const result = new Function(`return (${formula});`)();
                setResult(result);
            } catch (error) {
                setResult(`Error: ${(error as Error).message}`);
            }
        } else {
            setResult("");
        }
    }

    return (
        <div className="w-full flex flex-col">
            <ResultDisplayer result={result} />
            <Spacer h={1} />
            <FormulaInput
                value={formula}
                onChange={(e) => {
                    setFormula(e.target.value);
                    calculate(e.target.value);
                }}
            />
            <Spacer h={1} />
            <CheatSheet/>
            <Spacer h={1} />
            <FuntionCode/>
        </div>
    );
}