import React, { useState } from 'react';
import TitleHeader from './TitleHeader.tsx';
import CardPanel from './CardPanel.tsx';
import { useSelector } from 'react-redux';

export default function CardBasicExample(): JSX.Element {
    const clazzInfo = useSelector((state) => state.clazz.clazzInfo);
    return (
        <>
            <div
                className="block w-9/12 rounded-lg bg-white  shadow-lg dark:bg-neutral-700 ">
                <TitleHeader title={"Danh sách lớp học"} disableIcon={true} className='my-2 px-2 rounded-sm bg-gray-300' />
                <div className='max-h-[27.5rem] overflow-auto'>
                    {clazzInfo ?
                        clazzInfo.map((item, index) =>
                            <CardPanel
                                clazz={item.code} room={item.room.room} shift={item.shift.name}
                                amount={item.studyIns.length + "/" + item.quantity}
                                dateStart={item.startTime} dateWeek={item.dayOfWeek}
                                clazzId={item.id}
                            />
                        ) :
                        <CardPanel clazz="..." room="..." shift="..." amount="..." dateStart="..." dateWeek="..." disabled={true} />
                    }
                </div>

            </div>
        </>
    );
}