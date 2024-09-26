import React from 'react';
import MiniPanel from './MiniPanel.tsx';
import TitleHeader from './TitleHeader.tsx';
import CardPanel from './CardPanel.tsx';

export default function CardBasicExample(): JSX.Element {
    return (
        <>

            <div
                className="block w-9/12 rounded-lg bg-white  shadow-lg dark:bg-neutral-700 ">
                <TitleHeader title={"Danh sách lớp học"} disableIcon={true} className='my-2 px-2 rounded-sm bg-gray-300' />
                <div className='max-h-[23rem] overflow-auto'>
                    <CardPanel clazz='WEB105' room='T802' shift={2} amount={36} dateStart='9/9/2024' dateWeek='2, 4, 6' />
                    <CardPanel clazz='WEB105' room='T802' shift={2} amount={36} dateStart='9/9/2024' dateWeek='2, 4, 6' />
                    <CardPanel clazz='WEB105' room='T802' shift={2} amount={36} dateStart='9/9/2024' dateWeek='2, 4, 6' />
                </div>

            </div>
        </>
    );
}