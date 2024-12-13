import Container from "../../components/Container.tsx"
import React, { useEffect, useState } from "react";
import TitleHeader from "../../components/TitleHeader.tsx";
import Tables from "../../components/tables/Tables.tsx";
// import { getAllStudyHistoryByStudentAPI } from '../../services/StudyHistoryService.js'
import { getAllSubjectsByEducationProgramAndStudyHistoryAPI } from '../../services/SubjectSerivce.js'
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
    const [listSubject, setListSubject] = useState<StudyHistory[]>([]);
    const [sumSubjectPassed, setSumSubjectPassed] = useState(0);
    const [sumSubjectReStudy, setSumSubjectReStudy] = useState(0);
    const [sumSubjectNotStudy, setSumSubjectNotStudy] = useState(0);
    const [sumSubjectStudying, setSumSubjectStudying] = useState(0);
    const [sumcredits, setSumcredits] = useState(0);
    const [sumcreditsPassed, setSumcreditsPassed] = useState(0);
    const [markAverage, setMarkAverage] = useState(0.0);

    const userInfor = useSelector((state) => state.user.userInfo)

    const renderRow = (item: StudyHistory) => [
        <td key={`item-subjectCode-${item.id}`} className="px-6 py-4">{item.subjectCode}</td>,
        <td key={`item-name-${item.id}`} className="px-6 py-4">{item.name}</td>,
        <td key={`item-credits-${item.id}`} className="px-6 py-4">{item.credits}</td>,
        <td key={`item-semester-year-${item.id}`} className="px-6 py-4">{item.semester + ' ' + item.year}</td>,
        <td key={`item-averageScore-${item.id}`} className={`px-6 py-4 ${item.averageScore != 0 ? 'font-bold' : ''}`}>
            {item.averageScore.toFixed(1)}
        </td>,
        <td key={`item-activityStatus-${item.id}`}
            className={`px-6 py-4 font-bold ${item.activityStatus === 'Chưa hoàn thành' ? 'text-red-500' : item.activityStatus === 'Hoàn thành' ? 'text-green-500' : item.activityStatus === 'Đang học' ? 'text-sky-500' : 'text-gray-500'}`}
        >
            {item.activityStatus}
        </td>
    ];

    const statisticalList = [
        {
            totalSubjectNotYet: sumSubjectNotStudy,
            totalSubjectPassed: sumSubjectPassed,
            totalSubjectFalsed: sumSubjectReStudy,
            totalSubjectStudying: sumSubjectStudying
        }
    ]

    const renderRow2 = (item) => [
        <td key={`item-subjectCode-${item.id}`} className="px-6 py-4">{item.totalSubjectNotYet}</td>,
        <td key={`item-name-${item.id}`} className="px-6 py-4">{item.totalSubjectPassed}</td>,
        <td key={`item-credits-${item.id}`} className="px-6 py-4">{item.totalSubjectFalsed}</td>,
        <td key={`item-semester-year-${item.id}`} className="px-6 py-4">{item.totalSubjectStudying}</td>,
    ];

    // Thứ tự ưu tiên cho semester
    const semesterOrder = { 'SPRING': 1, 'SUMMER': 2, 'FALL': 3 };

    const handleAPI = async (privateMajorName) => {
        const response = await getAllSubjectsByEducationProgramAndStudyHistoryAPI(privateMajorName);
        if (response && response.data) {
            // Sắp xếp mảng
            const sortedData = response.data.sort((a, b) => {
                const yearA = a.year || 0; // Nếu year rỗng thì mặc định là 0
                const yearB = b.year || 0;

                if (yearA !== yearB) {
                    return yearA - yearB; // Sắp xếp theo year
                }

                // Nếu year giống nhau, sắp xếp theo semester
                const semesterA = semesterOrder[a.semester?.toUpperCase()] || 0;
                const semesterB = semesterOrder[b.semester?.toUpperCase()] || 0;

                return semesterA - semesterB;
            }).reverse();
            setListSubject(sortedData)

            let sumStudying = 0;
            let sumReStudy = 0;
            let sumPassed = 0;
            let sumNotStudy = 0;
            let sumcredits = 0;
            let sumcreditsPassed = 0;
            let index = 0;
            let markAverage = 0.0;

            response.data.forEach(subject => {
                sumcredits += Number(subject.credits);

                if (subject.activityStatus == "Đang học")
                    sumStudying += 1;
                else if (subject.activityStatus == "Chưa hoàn thành")
                    sumReStudy += 1;
                else if (subject.activityStatus == "Chưa học")
                    sumNotStudy += 1;
                else {
                    sumPassed += 1;
                    sumcreditsPassed += Number(subject.credits);
                }

                // tinh diem trung binh
                if (subject.activityStatus == "Chưa hoàn thành" || subject.activityStatus == "Hoàn thành") {
                    index += 1;
                    markAverage += subject.averageScore;
                }
            });
            setSumSubjectNotStudy(sumNotStudy);
            setSumSubjectPassed(sumPassed);
            setSumSubjectReStudy(sumReStudy);
            setSumSubjectStudying(sumStudying);
            setSumcredits(sumcredits);
            setSumcreditsPassed(sumcreditsPassed);
            setMarkAverage(markAverage / index);
        }
    }

    useEffect(() => {
        if (userInfor)
            handleAPI(userInfor.privateMajorName);
    }, [userInfor])

    return (
        <Container>
            <TitleHeader title="BẢNG ĐIỂM" />
            <div className="w-full bg-white p-4 pt-10 shadow-md rounded-2xl">
                <TitleHeader title={`Chuyên ngành: ${userInfor && userInfor.education_program.major.name} (${userInfor && userInfor.privateMajorName})`} disableIcon={true} />
                <div className="pt-8 overflow-x-auto">
                    <Tables
                        headers={["Mã Môn", "Tên Môn", "Số Tín Chỉ", "Học Kỳ", "Điểm Trung Bình", "Trạng Thái"]}
                        renderRow={renderRow}
                        data={listSubject}
                        advanced={true}
                        disableSelectBox={true}
                        // loading={isLoading}
                        advancedRowFilter
                    />
                    <div>
                        <p className="text-[#9A9A9A] text-base self-center mr-3">Điểm trung bình: <strong>{markAverage.toFixed(1)}</strong></p>
                        <p className="text-[#9A9A9A] text-base self-center mr-3">Tín chỉ: <strong>{sumcreditsPassed + '/' + sumcredits}</strong>(Đạt / Tổng)</p>
                        <p className="text-[#9A9A9A] text-base self-center mr-3">Chuyên ngành: <strong>{userInfor && userInfor.education_program.major.name}</strong></p>
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