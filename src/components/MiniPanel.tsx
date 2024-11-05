import TitleHeader from "./TitleHeader.tsx";
import React, { useState, useEffect } from "react";
import Button from "./Button.tsx";
import { useSelector } from 'react-redux';
import { getAllClazzBySubject } from '../services/ClazzService.js'
import { useDispatch } from 'react-redux';
import { setClazz, removeClazz } from "../reducers/clazzSlice.tsx";

interface Props {
    name: string;
    code: string;
    credit: number;
    className?: string;
    disableIconHeader?: boolean;
}
// <div className="mb-5 space-x-3 flex flex-wrap md:flex-nowrap ">    thêm này bao quanh nếu mún dùng nhiều  mini để repon 

export default function MiniPanel({ name, code, credit, className = "", disableIconHeader = false }: Props) {
    const dispatch = useDispatch();
    const subjectId = useSelector((state) => state.clazz.subjectId);
    const [clazzList, setClazzList] = useState([]);

    useEffect(() => {
        getAllClazz();
    }, [])

    async function getAllClazz() {
        let response = await getAllClazzBySubject(subjectId);
        if (response && response.data && response.data.length > 0) {
            setClazzList(response.data)
        }
        // console.log("check, ", response)
    }

    const handlShift = async (shift) => {
        let list = [];
        clazzList.forEach(element => {
            if (element.shift === shift) {
                list.push(element);
            }
        });

        if (list.length > 0) {
            dispatch(setClazz({
                clazzInfo: list,
                subjectId: subjectId
            }));
        }
        else {
            dispatch(removeClazz());
        }


        // let response = await getAllClazzBySubject(subjectId, shift);
        // if (response && response.data && response.data.length > 0) {
        //     dispatch(setClazz({
        //         clazzInfo: response.data,
        //         subjectId: subjectId
        //     }));
        // }
        // else {
        //     dispatch(removeClazz());
        // }
    }
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
                                    onClick={() => handlShift(1)}
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
                                    onClick={() => handlShift(2)}
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
                                    onClick={() => handlShift(3)}
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
                                    onClick={() => handlShift(4)}
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
                                    onClick={() => handlShift(5)}
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
                                    onClick={() => handlShift(6)}
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