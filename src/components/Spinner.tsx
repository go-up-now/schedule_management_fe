import React, { FaCircleNotch } from "react-icons/fa";

interface Spinner {
    className?: string;
}

export default function Spinner({ className }: Spinner) {
    return (
        <>
            <FaCircleNotch className={`animate-spin w-5 h-5 ` + className} />
        </>
    )
}