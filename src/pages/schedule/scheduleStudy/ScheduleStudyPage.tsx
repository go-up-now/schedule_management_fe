import Container from "../../../components/Container.tsx"
import React, { useEffect, useState } from "react";
import TitleHeader from "../../../components/TitleHeader.tsx";
import SelectBox from "../../../components/SelectBox.tsx";
import Tables from "../../../components/tables/Tables.tsx";
import { getClazzInStudyinByStudentAPI } from '../../../services/ClazzService.js'
import { startOfDay, endOfDay, eachDayOfInterval, getDay, format, parse } from 'date-fns';

interface Clazz {
    id: number;
    code: string;
    onlineLink: string;
    quantity: number | string;
    block: number | string;
    semester: string;
    year: number | string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    status: boolean;
    instructorCode: string;
    shift: Shift;
    activityStatus: string;
    subject: Subject;
    room: Room;
}

interface Subject {
    code: string;
    name: string;
}

interface Room {
    room: string;
    building: {
        name: string,
        address: string,
    }
}

interface Shift {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
}

interface Option {
    value: number;
    label: string;
}

const ScheduleStudyPage = () => {
    const [listClazzAPI, setListClazzAPI] = useState<Clazz[]>([]);
    const [listClazz, setListClazz] = useState<Clazz[]>([]);
    const [selectedSchedule, setSelectedSchedule] = useState<Number>(1)

    const scheduleOptions: Option[] = [
        { value: 1, label: '7 ngày tới' },
        { value: 2, label: '14 ngày tới' },
        { value: 3, label: '30 ngày tới' },
        { value: 4, label: '7 ngày trước' },
        { value: 5, label: '14 ngày trước' },
        { value: 6, label: '30 ngày trước' }
    ];

    const getSpecificWeekdays = (startDate, endDate, weekdays) => {
        const start = startOfDay(new Date(startDate));
        const end = endOfDay(new Date(endDate));

        // Xác định các ngày trong tuần mong muốn
        let targetDays;
        if (JSON.stringify(weekdays) === JSON.stringify([2, 4, 6])) {
            // Nếu weekdays là [2, 4, 6], tương ứng với Thứ Hai (1), Thứ Tư (3), Thứ Sáu (5)
            targetDays = [1, 3, 5];
        } else if (JSON.stringify(weekdays) === JSON.stringify([3, 5, 7])) {
            // Nếu weekdays là [3, 5, 7], tương ứng với Thứ Ba (2), Thứ Năm (4), Thứ Bảy (6)
            targetDays = [2, 4, 6];
        }

        const allDays = eachDayOfInterval({ start, end });
        const specificWeekdays = allDays.filter(day => targetDays.includes(getDay(day)));

        return specificWeekdays;
    };

    // Hàm để lấy ngày trong tuần từ `dayOfWeek` dạng chuỗi như "2, 4, 6"
    const getWeekdaysFromString = (dayOfWeekString) => {
        return dayOfWeekString.split(',').map(day => parseInt(day.trim()));
    };

    // Hàm để chuyển đổi số ngày trong tuần (0-6) thành tên thứ (ví dụ 0 -> Chủ nhật, 1 -> Thứ 2)
    const getDayName = (dayIndex) => {
        const days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
        return days[dayIndex];
    };

    // Hàm để tạo danh sách clazz với ngày và thứ tương ứng
    const getClazzWithWeekdays = (clazzList) => {
        return clazzList.map(clazz => {
            // const { startTime, endTime, dayOfWeek, code } = clazz;

            // Chuyển đổi dayOfWeek từ chuỗi thành mảng các ngày trong tuần
            const weekdays = getWeekdaysFromString(clazz.dayOfWeek);

            // Lấy các ngày trong khoảng thời gian từ startTime đến endTime
            const specificWeekdays = getSpecificWeekdays(clazz.startTime, clazz.endTime, weekdays);

            // Tạo danh sách các ngày với thông tin ngày và thứ
            const classList = specificWeekdays.map(day => {
                const dayIndex = getDay(day);
                return {
                    code: clazz.code,
                    onlineLink: clazz.onlineLink,
                    block: clazz.block,
                    instructorCode: clazz.instructorCode,
                    shift: clazz.shift.id,
                    startTime: clazz.shift.startTime,
                    endTime: clazz.shift.endTime,
                    room: clazz.room.room,
                    building: clazz.room.building.name,
                    address: clazz.room.building.address,
                    subjectCode: clazz.subject.code,
                    subjectName: clazz.subject.name,
                    date: format(day, 'dd/MM/yyyy'),
                    dayOfWeek: getDayName(dayIndex)
                };
            });
            return {
                classList
            };
        });
    };

    // Hàm để loại bỏ 3 thứ ngày cuối
    const removeLastThreeDays = (clazzList) => {
        return clazzList.map(clazz => {
            // Cắt bỏ 3 ngày cuối
            const updatedClassList = clazz.classList.slice(0, -3);

            // Trả về clazz mới với classList đã thay đổi
            return {
                classList: updatedClassList
            };
        });
    };

    const classes = (listClazzes) => {
        // Gộp tất cả các ngày vào một mảng duy nhất
        let listClazz = removeLastThreeDays(listClazzes);
        let allClazzs = [];
        listClazz.forEach(clazz => {
            clazz.classList.forEach(clazz1 => {
                allClazzs.push(clazz1);
            });
        });

        // Hàm sắp xếp theo trường `date`
        allClazzs.sort((a, b) => {
            const dateA = new Date(a.date.split("/").reverse().join("-")); // Chuyển đổi chuỗi ngày dd/mm/yyyy thành yyyy-mm-dd
            const dateB = new Date(b.date.split("/").reverse().join("-"));
            return dateA - dateB; // So sánh ngày A và B
        });
        return allClazzs
    }

    // Hàm để lấy các ngày trong x ngày tới
    const getDatesInNextDays = (clazzList, day) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); // lấy ngày hôm qua

        const nextDays = new Date(yesterday);
        nextDays.setDate(yesterday.getDate() + day + 1);  // Tính ngày trong x ngày tới

        // Lọc các ngày trong classList nằm trong khoảng từ hôm nay đến x ngày tới
        const classes = clazzList.filter(item => {
            const classDate = parse(item.date, 'dd/MM/yyyy', new Date());
            return yesterday < classDate && classDate <= nextDays;
        });
        return classes
    };

    // Hàm để lấy các ngày trong x ngày trước
    const getDatesInPreDays = (clazzList, day) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); // lấy ngày hôm qua

        const preDays = new Date(yesterday);
        preDays.setDate(preDays.getDate() - day - 1);  // Tính ngày trong x ngày trước

        // Lọc các ngày trong classList nằm trong khoảng từ hôm nay đến x ngày trước
        const classes = clazzList.filter(item => {
            const classDate = parse(item.date, 'dd/MM/yyyy', new Date());
            return preDays <= classDate && classDate <= yesterday
        });

        classes.sort((a, b) => {
            const dateA = new Date(a.date.split("/").reverse().join("-")); // Chuyển đổi chuỗi ngày dd/mm/yyyy thành yyyy-mm-dd
            const dateB = new Date(b.date.split("/").reverse().join("-"));
            return dateB - dateA; // So sánh ngày A và B
        });
        return classes
    };

    const renderRow = (item) => [
        <td key={`item-date-${item.id}`} className="px-6 py-4">{item.dayOfWeek + ' ' + item.date}</td>,
        <td key={`item-room-${item.id}`} className="px-6 py-4">{item.room}<br />{'(' + item.building + ')'}</td>,
        <td key={`item-address-${item.id}`} className="px-6 py-4">{item.address}</td>,
        <td key={`item-subjectCode-${item.id}`} className="px-6 py-4">{item.subjectCode}</td>,
        <td key={`item-subjectName-${item.id}`} className="px-6 py-4">{item.subjectName}</td>,
        <td key={`item-code-${item.id}`} className="px-6 py-4">{item.code}</td>,
        <td key={`item-instructorCode-${item.id}`} className="px-6 py-4">{item.instructorCode}</td>,
        <td key={`item-shift-${item.id}`} className="px-6 py-4">{item.shift}</td>,
        <td key={`item-startTime-endTime-${item.id}`} className="px-6 py-4">{item.startTime + ' - ' + item.endTime}</td>,
        <td key={`item-onlineLink-${item.id}`} className="px-6 py-4">{item.onlineLink}</td>,
    ];

    const handleSelectBox = (selectedSchedule) => {
        let clazzs = [];
        if (selectedSchedule == 1)
            clazzs = getDatesInNextDays(listClazzAPI, 7)
        else if (selectedSchedule == 2)
            clazzs = getDatesInNextDays(listClazzAPI, 14)
        else if (selectedSchedule == 3)
            clazzs = getDatesInNextDays(listClazzAPI, 30)
        else if (selectedSchedule == 4)
            clazzs = getDatesInPreDays(listClazzAPI, 7)
        else if (selectedSchedule == 5)
            clazzs = getDatesInPreDays(listClazzAPI, 14)
        else if (selectedSchedule == 6)
            clazzs = getDatesInPreDays(listClazzAPI, 30)
        setListClazz(clazzs);
    }

    const handleAPI = async () => {
        const response = await getClazzInStudyinByStudentAPI();
        if (response && response.data) {
            let listClazes = getClazzWithWeekdays(response.data)
            setListClazzAPI(classes(listClazes))
            setListClazz(getDatesInNextDays(classes(listClazes), 7))
        }
    }

    useEffect(() => {
        handleSelectBox(selectedSchedule)
    }, [selectedSchedule])

    useEffect(() => {
        handleAPI();
    }, [])

    return (
        <Container>
            <TitleHeader title="LỊCH HỌC" />
            <div className="w-full bg-white p-4 shadow-md rounded-2xl">
                <div className="columns-1">
                    <SelectBox
                        id="schedule"
                        name="schedule"
                        disableDefaultOption={true}
                        disable={false}
                        options={scheduleOptions}
                        customClassName={"w-3/12"}
                        onChange={event => setSelectedSchedule(Number(event.target.value))}
                    />
                    Lựa chọn thời gian để hiển thị chi tiết lịch học
                </div>
                <div className="pt-8 overflow-x-auto">
                    <Tables
                        headers={["Ngày", "Phòng", "Giảng Đường", "Mã Môn", "Tên Môn", "Lớp", "Giảng Viên", "Ca", "Thời Gian", "Link Học Trực Tuyến"]}
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

export default ScheduleStudyPage;