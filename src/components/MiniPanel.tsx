import TitleHeader from "./TitleHeader";
import React from "react";

interface Props {
    title: string;
    amount: number;
    date?: string;
    icon?: React.ReactNode;
    className?: string;
    disableIconHeader?: boolean;
}
// <div className="mb-5 space-x-3 flex flex-wrap md:flex-nowrap ">    thêm này bao quanh nếu mún dùng nhiều  mini để repon 

export default function MiniPanel({ title, amount, date, icon, className = "", disableIconHeader = false }: Props) {
    return (
        <div className={"w-full md:w-6/12 bg-white shadow-md rounded-2xl mb-4 md:mb-0 " + className}>
            <div className={"h-[11rem] w-full bg-white rounded-lg p-5 relative shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"}>
                <TitleHeader title={title} disableIcon={disableIconHeader} />
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-[2.5rem] font-bold my-3">{amount}</p>
                        <p>{date}</p>
                    </div>
                    {icon && (
                        <div className="p-2">
                            {icon}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}