import React, { useEffect, useState } from "react";
import Tables from "../../components/tables/Tables";
import { getAllByStudyHistoryIdAPI } from '../../services/DetailScoreCardService.js';

interface DetailScoreCard {
    id: number;
    mark: number;
    studyHistoryId: number;
    markColumn: {
        id: number;
        name: string;
        percentage: number;
    };
}

export const TranscriptDetailPage = ({ subject }) => {
    const [listDetailScoreCard, setListDetailScoreCard] = useState<DetailScoreCard[]>([]);
    const [averageScore, setAverageScore] = useState(0.0);
    const [ispassed, setIsPassed] = useState(false);

    const renderRow = (item: DetailScoreCard) => [
        <td key={`item-markColumn-name-${item.id}`} className="px-6 py-4">{item.markColumn.name}</td>,
        <td key={`item-markColumn-percentage-${item.id}`} className="px-6 py-4">{item.markColumn.percentage}</td>,
        <td key={`item-mark-${item.id}`} className="px-6 py-4">{item.mark}</td>,
        <td key={`item-note-${item.id}`} className="px-6 py-4"></td>
    ];

    const handleAPI = async () => {
        try {
            let response = await getAllByStudyHistoryIdAPI(subject.id);
            if (response && response.code === 200) {
                setListDetailScoreCard(response.data);

                // Tính điểm trung bình
                let mark = 0.0;
                let flag = false;
                response.data.forEach(element => {
                    mark += element.mark * (element.markColumn.percentage / 100);

                    // Kiểm tra điểm bảo vệ asm >= 5
                    if (element.markColumn.id === 25 && element.mark >= 5) {
                        flag = true;
                    }
                });
                setAverageScore(mark)

                // Kiểm tra passed or failed
                if (mark >= 5 && flag) {
                    setIsPassed(true)
                }
            }
        } catch (error) {
            console.log("Lỗi lấy bảng điểm chi tiết của sinh viên: ", error)
        }
    }

    useEffect(() => {
        handleAPI();
    }, [])
    return (
        <>
            <div className="w-full bg-white p-4 pt-10 shadow-md rounded-2xl ">
                <div className="overflow-x-auto">
                    <Tables
                        headers={["Tên Đầu Điểm", "Trọng Số", "Điểm", "Ghi Chú"]}
                        renderRow={renderRow}
                        data={listDetailScoreCard}
                        advanced={true}
                        disableSelectBox={true}
                        // loading={isLoading}
                        advancedRowFilter
                    />
                    <div>
                        <p className="text-[#9A9A9A] text-base self-center font-bold mr-3">Điểm trung bình: <span className="text-red-500">{averageScore.toFixed(1)}</span><strong>{ }</strong></p>
                        <p className="text-[#9A9A9A] text-base self-center font-bold mr-3">Trạng thái: <span className={`${ispassed ? 'text-green-500' : 'text-red-500'} `}>{ispassed ? 'Passed' : 'Failed'}</span><strong>{ }</strong></p>
                    </div>
                </div>
            </div>
        </>
    );
}