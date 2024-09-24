import React, { Link } from "react-router-dom";
import SvgIcon from "../components/SvgIcon.tsx";
import { IconType } from "react-icons";
interface HelpBoxProps {
    icon: IconType;
    headerText: string;
    bodyText: string;
    answerCount: number;
    href: string;
}

export default function HelpBox({ icon, headerText, bodyText, answerCount, href }: HelpBoxProps) {
    return (
        <Link className="block p-10 text-center bg-white rounded-lg shadow hover:shadow-xl" to={href} onClick={() => window.scrollTo(0, 0)}>
            <div className="flex mx-auto bg-gray-200  w-14 h-14 rounded-full">
                <SvgIcon Component={icon} className=" fill-black w-14 h-14 p-4" />
            </div>
            <h3 className="text-xl font-semibold mb-2 mt-4">{headerText}</h3>
            <p className="text-gray-700 mb-2">{bodyText},...</p>
            <p className="text-gray-500">
                <span className="font-medium text-gray-800">{answerCount}</span> câu trả lời
            </p>
        </Link>
    )
}