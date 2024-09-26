import TitleHeader from "./TitleHeader.tsx";
import React from "react";
import Button from "./Button.tsx";

interface Props {
    title: string;
    code: string;
    clazz: string;
    amount: number;
    shift: number;
    weekday: string;
    date: string;
    className?: string;
    disableIconHeader?: boolean;
}
// <div className="mb-5 space-x-3 flex flex-wrap md:flex-nowrap ">    thêm này bao quanh nếu mún dùng nhiều  mini để repon 

export default function SchedulePanel({ title, code, clazz, amount, shift, weekday, date, className = "", disableIconHeader = false }: Props) {
    return (
        <div className={"w-full md:w-6/12 bg-white shadow-md rounded-2xl border-current mb-4 md:mb-0 " + className}>
            <div className={"h-[17rem] w-full bg-white rounded-lg p-5 relative shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"}>
                <TitleHeader title={title} disableIcon={disableIconHeader} />
                <div className="flex justify-between items-center">
                    <div>
                        <p className="">Mã môn: {code}</p>
                        <p className="">Lớp học hiện tại: {clazz}</p>
                        <p className="">Số lượng thành viên: {amount}</p>
                        <p className="">Ca học hiện tại: {shift}</p>
                        <p className="">Thời gian học thứ: {weekday}</p>
                        <p className="">Ngày bắt đầu: {date}</p>
                        <p className="">Ca học có thể đăng ký:</p>
                        <p>
                            <Button
                                type="button"
                                size="xs"
                                variant="btn-none"
                                className="bg-blue-500 p-1 mr-1 w-full md:w-14 self-center"
                            >
                                Ca 1
                            </Button>
                            <Button
                                type="button"
                                size="xs"
                                variant="btn-none"
                                className="bg-blue-500 p-1 mr-1 w-full md:w-14 self-center"
                            >
                                Ca 2
                            </Button>
                            <Button
                                type="button"
                                size="xs"
                                variant="btn-none"
                                className="bg-blue-500 p-1 mr-1 w-full md:w-14 self-center"
                            >
                                Ca 3
                            </Button>
                            <Button
                                type="button"
                                size="xs"
                                variant="btn-none"
                                className="bg-blue-500 p-1 mr-1 w-full md:w-14 self-center"
                            >
                                Ca 4
                            </Button>
                            <Button
                                type="button"
                                size="xs"
                                variant="btn-none"
                                className="bg-blue-500 p-1 mr-1 w-full md:w-14 self-center"
                            >
                                Ca 5
                            </Button>
                            <Button
                                type="button"
                                size="xs"
                                variant="btn-none"
                                className="bg-blue-500 p-1 mr-1 w-full md:w-14 self-center"
                            >
                                Ca 6
                            </Button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}