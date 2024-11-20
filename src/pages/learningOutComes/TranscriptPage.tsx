import Container from "../../components/Container.tsx"
import React, { useEffect, useState } from "react";
import TitleHeader from "../../components/TitleHeader.tsx";
import Tables from "../../components/tables/Tables.tsx";
import { getAllStudyHistoryByStudentAPI } from '../../services/StudyHistoryService.js'
import { useSelector } from 'react-redux';

interface StudyHistory {
    id: number;
    clazzCode: string;
    block: number | string;
    semester: string;
    year: number | string;
    credits: string | number;
    name: string;
    activityStatus: string;
    averageScore: number;
    instructor: string;
    subjectCode: string;
}

const TranscriptPage = () => {
    const [listClazz, setListClazz] = useState<StudyHistory[]>([]);

    const userInfor = useSelector((state) => state.user.userInfo)

    const renderRow = (item: StudyHistory) => [
        <td key={`item-subjectCode-${item.id}`} className="px-6 py-4">{item.subjectCode}</td>,
        <td key={`item-name-${item.id}`} className="px-6 py-4">{item.name}</td>,
        <td key={`item-credits-${item.id}`} className="px-6 py-4">{item.credits}</td>,
        <td key={`item-semester-year-${item.id}`} className="px-6 py-4">{item.semester + ' ' + item.year}</td>,
        <td key={`item-averageScore-${item.id}`} className="px-6 py-4">{item.averageScore.toFixed(1)}</td>,
        <td key={`item-activityStatus-${item.id}`}
            className={`px-6 py-4 font-bold ${item.activityStatus === 'Chưa hoàn thành' ? 'text-red-500' : item.activityStatus === 'Hoàn thành' ? 'text-green-500' : 'text-sky-400'}`}
        >
            {item.activityStatus}
        </td>
    ];

    const statisticalList = [
        {
            totalSubjectNotYet: 3,
            totalSubjectPassed: 5,
            totalSubjectFalsed: 0,
            totalSubjectStudying: 2
        }
    ]

    const renderRow2 = (item) => [
        <td key={`item-subjectCode-${item.id}`} className="px-6 py-4">{item.totalSubjectNotYet}</td>,
        <td key={`item-name-${item.id}`} className="px-6 py-4">{item.totalSubjectPassed}</td>,
        <td key={`item-credits-${item.id}`} className="px-6 py-4">{item.totalSubjectFalsed}</td>,
        <td key={`item-semester-year-${item.id}`} className="px-6 py-4">{item.totalSubjectStudying}</td>,
    ];

    const handleAPI = async () => {
        const response = await getAllStudyHistoryByStudentAPI();
        if (response && response.data) {
            setListClazz(response.data)
        }
    }

    useEffect(() => {
        handleAPI();
    }, [])

    return (
        <Container>
            <TitleHeader title="BẢNG ĐIỂM" />
            <div className="w-full bg-white p-4 pt-10 shadow-md rounded-2xl">
                <TitleHeader title={`Chuyên ngành: ${userInfor && userInfor.education_program.major.name} (${userInfor && userInfor.privateMajorName})`} disableIcon={true} />
                <div className="pt-8 overflow-x-auto">
                    <Tables
                        headers={["Mã Môn", "Tên Môn", "Số Tín Chỉ", "Học Kỳ", "Điểm Trung Bình", "Trạng Thái"]}
                        renderRow={renderRow}
                        data={listClazz}
                        advanced={true}
                        disableSelectBox={true}
                        // loading={isLoading}
                        advancedRowFilter
                    />
                    <div>
                        <p className="text-[#9A9A9A] text-base self-center mr-3">Điểm trung bình: 8.8<strong>{ }</strong></p>
                        <p className="text-[#9A9A9A] text-base self-center mr-3">Tín chỉ: 93/103 (Đạt / Tổng)<strong>{ }</strong></p>
                        <p className="text-[#9A9A9A] text-base self-center mr-3">Chuyên ngành: <strong>{ }</strong></p>
                    </div>
                </div>
                <div className="mt-5 overflow-x-auto">
                    <TitleHeader title={`Thống kê`} disableIcon={true} />
                    <Tables
                        headers={["Tổng môn chưa học", "Tổng môn đạt", "Tổng môn học lại", "Tổng môn đang học"]}
                        renderRow={renderRow2}
                        data={statisticalList}
                        disableSelectBox={true}
                        isPage={false}
                        isNumber={false}
                    // loading={isLoading}
                    />
                </div>
            </div>
        </Container>
    )
}

export default TranscriptPage;