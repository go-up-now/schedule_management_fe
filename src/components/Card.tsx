import React from "react";

interface CardProps {
    name?: string;
    id?: number;
    img?: string;
    title?: string;
    date?: string;
    place?: string;
    link?: string;
    className?: string;
    imgClassName?: string;
    status?: string
    hiddenText?: boolean
}


export default function Card({
    className,
    imgClassName,
    img,
    title,
    date,
    place,
    status,
    hiddenText }
    : CardProps) {
    return (
        <>
            <div className={`${className} relative`} >
                <img src={`${img}`} alt="" className={`h-20  ${hiddenText ? 'md:h-48' : 'md:h-48 lg:h-64'}  rounded-lg  ${imgClassName}`} />
                <div className="w-full mt-2">
                    <div className="w-full flex justify-between">
                        <p className="text-xs md:text-lg font-semibold hover:text-amber-500 ">{title} <span>{status}</span> </p>
                        <p className={`hidden md:block ${hiddenText ? 'md:hidden' : ''} self-center text-xs md:text-base text-[#9A9A9A]`}>Địa điểm: {place}</p>
                    </div>

                    <div className="w-full">
                        <p className={`text-xs hidden md:block ${hiddenText ? 'md:hidden' : ''} md:text-base text-[#9A9A9A]`}>Bắt đầu: {date} </p>
                    </div>

                </div>
            </div>

        </>
    )
}