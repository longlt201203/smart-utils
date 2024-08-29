import { Collapse, Table } from "@geist-ui/core";

const data = [
    {
        symbol: "+",
        description: "Addition",
        usage: "3+1"
    },
    {
        symbol: "-",
        description: "Substraction",
        usage: "3-1"
    },
    {
        symbol: "*",
        description: "Multiplication",
        usage: "3*1"
    },
    {
        symbol: "/",
        description: "Division",
        usage: "3/1"
    },
    {
        symbol: "%",
        description: "Modulus",
        usage: "3%1"
    },
    {
        symbol: "e",
        description: "Power of 10",
        usage: "3e2"
    },
];

export default function CheatSheet() {
    return (
        <Collapse.Group>
            <Collapse title="Cheat Sheet">
                <Table data={data}>
                    <Table.Column prop="symbol" label="symbol" />
                    <Table.Column prop="description" label="description" />
                    <Table.Column prop="usage" label="usage" />
                </Table>
            </Collapse>
        </Collapse.Group>
    );
}