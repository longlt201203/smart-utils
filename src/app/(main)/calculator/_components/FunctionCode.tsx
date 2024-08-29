import { Collapse } from "@geist-ui/core";
import SyntaxHighlighter from "react-syntax-highlighter";
import { googlecode } from "react-syntax-highlighter/dist/esm/styles/hljs";

const code = "function calculateFormula(formula: string): number | string {\r\n    try {\r\n        const regex = /^[0-9e+\\-*/%().\\s]+$/;\r\n        if (!regex.test(formula)) {\r\n            throw new Error(\"Invalid formula!\");\r\n        }\r\n        // Use the Function constructor to safely evaluate the formula\r\n        const result = new Function(`return (${formula});`)();\r\n        return result;\r\n    } catch (error) {\r\n        // Handle any errors that may occur\r\n        return `Error: ${(error as Error).message}`;\r\n    }\r\n}\r\n\r\n// Example usage\r\nconst formula = \"2+10*(2+3*(2-1))\";\r\nconst result = calculateFormula(formula);\r\nconsole.log(`The result of the formula ${formula} is ${result}`);";

export default function FuntionCode() {
    return (
        <Collapse.Group>
            <Collapse title="Formula Calculation Function Code">
                <SyntaxHighlighter style={googlecode} language="typescript">{code}</SyntaxHighlighter>
            </Collapse>
        </Collapse.Group>
    );
}