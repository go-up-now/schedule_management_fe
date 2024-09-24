// @flow strict
"use client"
import React, { useEffect, useRef, useState } from "react";

function Popover({
    children,
    content,
    trigger = "click"
}) {
    const [show, setShow] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleMouseOver = () => {
        if (trigger === "hover") {
            setShow(true);
        };
    };

    const handleMouseLeft = () => {
        if (trigger === "hover") {
            setShow(false);
        };
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShow(false);
            }
        }

        if (show) {
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [show, wrapperRef]);

    return (
        <div
            ref={wrapperRef}
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseLeft}
            className="w-fit h-fit relative flex justify-center">
            <div
                onClick={() => setShow(!show)}
            >
                {children}
            </div>
            <div
                hidden={!show}
                className="min-w-fit w-[100px] h-fit absolute right-[100%] z-50 duration-700">
                <div className="rounded-xl bg-gray-50 shadow-2xl  mb-[10px]">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default Popover;