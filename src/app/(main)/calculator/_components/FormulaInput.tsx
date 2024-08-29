import { Input } from "@geist-ui/core";

export default function FormulaInput({
    value,
    onChange
}: {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <Input
            value={value}
            onChange={onChange}
            width="100%"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
            scale={4/3}
            placeholder="Formula. Example: 2+10*(2+3*(2-1))" />
    );
}