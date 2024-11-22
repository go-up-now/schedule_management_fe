import Container from "../../components/Container.tsx"
import React, { useEffect, useState } from "react";
import TitleHeader from "../../components/TitleHeader.tsx";
import Tables from "../../components/tables/Tables.tsx";
import { getAllStudyHistoryByStudentAPI } from '../../services/StudyHistoryService.js';
import Popover from "../../components/Popover.tsx";
import Button from "../../components/Button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Modal from "../../components/Modal.tsx";
import { TranscriptDetailPage } from "./TranscriptDetailPage.tsx";

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

interface Subject {
    id: number;
    code: string;
    name: string;
    credits: number;
    year: number;
    semester: String;
    status: boolean;
    cost: number
    specialization: Specialization
}

interface Specialization {
    code: string;
    name: string;
}

const LearningHistoryPage = () => {
    const [listClazz, setListClazz] = useState<StudyHistory[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subject, setSubject] = useState<Subject>();

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
        </td>,
        <td key={`item-${item.id}`} className="px-6 py-4 text-center">

            <Popover
                content={
                    <>
                        <div className="hover:bg-gray-200 rounded-xl">
                            <Button
                                type="button"
                                variant="btn-none"
                                className="w-1 h-[2.4rem] text-zinc-400 w-full"
                                onClick={() => openModal(item)}
                            >
                                Chi tiết
                            </Button>
                        </div>
                    </>
                }
            >
                <Button
                    type="button"
                    variant="btn-none"
                    className="w-1 h-[2.4rem] text-zinc-400"
                // onClick={(event) => handleMouseEnter(item, event)}
                >
                    <FontAwesomeIcon icon={faEllipsis} />
                </Button>
            </Popover>
        </td>,
    ];

    const openModal = async (item) => {
        setIsModalOpen(true);
        setSubject(item);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

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
                        headers={["Mã Môn", "Tên Môn", "Lớp", "Số Tín Chỉ", "Học Kỳ", "Block", "Điểm Trung Bình", "Giảng Viên", "Trạng Thái", ""]}
                        renderRow={renderRow}
                        data={listClazz}
                        advanced={true}
                        disableSelectBox={true}
                        // loading={isLoading}
                        advancedRowFilter
                    />
                </div>
            </div>
            <Modal id={"CourseRegistraionModal"}
                width="w-full md:max-w-6xl overflow-y-auto max-h-lvh"
                title={`Bảng điểm chi tiết môn ${subject?.name}`}
                content={
                    <TranscriptDetailPage subject={subject} />
                }
                positionButton="center"
                isOpen={isModalOpen}
                onClose={closeModal}
                type="message"
            >
            </Modal>
        </Container>
    )
}

export default LearningHistoryPage;