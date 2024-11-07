import Container from "../../components/Container.tsx"
import React, { useEffect, useState } from "react";
import TitleHeader from "../../components/TitleHeader.tsx";
import Tables from "../../components/tables/Tables.tsx";
import { getAllStudyHistoryByStudentAPI } from '../../services/StudyHistoryService.js'

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

const LearningHistoryPage = () => {
    const [listClazz, setListClazz] = useState<StudyHistory[]>([]);

    const renderRow = (item: StudyHistory) => [
        <td key={`item-subjectCode-${item.id}`} className="px-6 py-4">{item.subjectCode}</td>,
        <td key={`item-name-${item.id}`} className="px-6 py-4">{item.name}</td>,
        <td key={`item-clazzCode-${item.id}`} className="px-6 py-4">{item.clazzCode}</td>,
        <td key={`item-credits-${item.id}`} className="px-6 py-4">{item.credits}</td>,
        <td key={`item-semester-year-${item.id}`} className="px-6 py-4">{item.semester + ' ' + item.year}</td>,
        <td key={`item-block-${item.id}`} className="px-6 py-4">{item.block}</td>,
        <td key={`item-averageScore-${item.id}`} className="px-6 py-4">{item.averageScore.toFixed(1)}</td>,
        <td key={`item-instructor-${item.id}`} className="px-6 py-4">{item.instructor}</td>,
        <td key={`item-activityStatus-${item.id}`}
            className={`px-6 py-4 font-bold ${item.activityStatus === 'Chưa hoàn thành' ? 'text-red-500' : item.activityStatus === 'Hoàn thành' ? 'text-green-500' : 'text-sky-400'}`}
        >
            {item.activityStatus}
        </td>
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
            <TitleHeader title="LỊCH SỬ HỌC TẬP" />
            <div className="w-full bg-white p-4 pt-10 shadow-md rounded-2xl">
                <TitleHeader title="Danh sách các môn đã học" disableIcon={true} />
                <div className="pt-8 overflow-x-auto">
                    <Tables
                        headers={["Mã Môn", "Tên Môn", "Lớp", "Số Tín Chỉ", "Học Kỳ", "Block", "Điểm Trung Bình", "Giảng Viên", "Trạng Thái"]}
                        renderRow={renderRow}
                        data={listClazz}
                        advanced={true}
                        disableSelectBox={true}
                        // loading={isLoading}
                        advancedRowFilter
                    />
                </div>
            </div>
        </Container>
    )
}

export default LearningHistoryPage;