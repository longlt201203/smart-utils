"use client"

import FormulaInput from "@/app/(main)/calculator/_components/FormulaInput";
import ResultDisplayer from "@/app/(main)/calculator/_components/ResultDisplayer";
import { OperationTree } from "@/app/(main)/calculator/_lib/OperationTree";
import { Spacer } from "@geist-ui/core";
import { useState } from "react";

export default function Calculator() {
    const [formula, setFormula] = useState<string>("");
    const [result, setResult] = useState<string>("");

    const calculate = (formula: string) => {
        OperationTree.construct(formula);
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
        </div>
    );
}