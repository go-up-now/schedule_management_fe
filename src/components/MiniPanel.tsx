import TitleHeader from "./TitleHeader.tsx";
import React from "react";
import Button from "./Button.tsx";

interface Props {
    name: string;
    code: string;
    credit: number;
    className?: string;
    disableIconHeader?: boolean;
}
// <div className="mb-5 space-x-3 flex flex-wrap md:flex-nowrap ">    thêm này bao quanh nếu mún dùng nhiều  mini để repon 

export default function MiniPanel({ name, code, credit, className = "", disableIconHeader = false }: Props) {
    return (
        <div className={"w-full md:w-10/12 bg-white rounded-2xl mb-4 md:mb-0 " + className}>
            <div className={"h-auto w-full bg-white rounded-lg p-5 relative shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"}>
                <TitleHeader title={name} disableIcon={disableIconHeader} />
                <div className="flex justify-between">
                    <div>
                        <p >Mã môn: <span className="font-bold">{code}</span></p>
                        <p >Số tín chỉ: <span className="font-bold">{credit}</span></p>
                        <p >Ca học có thể đăng ký:</p>
                        <p className="flex flex-wrap gap-3 mt-2">
                            <div>
                                <Button
                                    type="button"
                                    size="xs"
                                    variant="btn-none"
                                    className="bg-blue-500 p-1 w-full md:w-14 self-center"
                                >
                                    Ca 1
                                </Button>
                            </div>
                            <div>
                                <Button
                                    type="button"
                                    size="xs"
                                    variant="btn-none"
                                    className="bg-blue-500 p-1 w-full md:w-14 self-center"
                                    disabled={true}
                                >
                                    Ca 2
                                </Button>
                            </div>
                            <div>
                                <Button
                                    type="button"
                                    size="xs"
                                    variant="btn-none"
                                    className="bg-blue-500 p-1 w-full md:w-14 self-center"
                                >
                                    Ca 3
                                </Button>
                            </div>
                            <div>
                                <Button
                                    type="button"
                                    size="xs"
                                    variant="btn-none"
                                    className="bg-blue-500 p-1 w-full md:w-14 self-center"
                                >
                                    Ca 4
                                </Button>
                            </div>
                            <div>
                                <Button
                                    type="button"
                                    size="xs"
                                    variant="btn-none"
                                    className="bg-blue-500 p-1 w-full md:w-14 self-center"
                                >
                                    Ca 5
                                </Button>
                            </div>
                            <div>
                                <Button
                                    type="button"
                                    size="xs"
                                    variant="btn-none"
                                    className="bg-blue-500 p-1 w-full md:w-14 self-center"
                                >
                                    Ca 6
                                </Button>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}