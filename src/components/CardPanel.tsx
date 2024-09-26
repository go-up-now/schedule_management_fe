import TitleHeader from "./TitleHeader.tsx";
import React from "react";
import Button from "./Button.tsx";

interface Props {
    clazz: string;
    room: string;
    shift: number;
    amount: number;
    dateStart?: string;
    dateWeek?: string;
    className?: string;
    disableIconHeader?: boolean;
}
// <div className="mb-5 space-x-3 flex flex-wrap md:flex-nowrap ">    thêm này bao quanh nếu mún dùng nhiều  mini để repon 

export default function CardPanel({ clazz, room, shift, amount, dateStart, dateWeek, className = "", disableIconHeader = false }: Props) {
    return (
        <div className={"w-full md:w-full bg-white rounded-2xl mb-4 md:mb-0" + className}>
            <div className={"h-auto w-full bg-white rounded-lg p-5 relative shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"}>
                <div className="flex justify-between">
                    <div>
                        <p >Tên lớp: <span className="font-bold">{clazz}</span></p>
                        <p >Phòng: <span className="font-bold">{room}</span></p>
                        <p >Ca học: <span className="font-bold">{shift}</span></p>
                        <p >Số lượng sinh viên: <span className="font-bold">{amount}</span></p>
                        <p >Ngày bắt đầu: <span className="font-bold">{dateStart}</span></p>
                        <p >Ngày học trong tuần: <span className="font-bold">{dateWeek}</span></p>
                        <p>
                            <Button
                                type="button"
                                size="xs"
                                variant="btn-none"
                                className="bg-blue-500 p-2 w-full md:w-20 self-center mt-1"
                            >
                                Đăng ký
                            </Button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}