declare module 'better-thousand-separator' {
    import { ReactNode } from "react";

    export interface SeparatorProps {
        className?: string;
        id?: string;
        separator?: keyof typeof separators;
    }

    export default function SeparatorInput(props: SeparatorInputProps): ReactNode;
}