import React from "react";
import SelectBox from "../components/SelectBox.tsx"

interface Semester {
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Semesters = ({ onChange }: Semester) => {
    let semesters = [
        { value: 'SPRING ', label: 'Spring ', index: 1 },
        { value: 'SUMMER ', label: 'Summer ', index: 2 },
        { value: 'FALL ', label: 'Fall ', index: 3 },
        { value: 'SPRING ', label: 'Spring ', index: 4 },
        { value: 'SUMMER ', label: 'Summer ', index: 5 },
        { value: 'FALL ', label: 'Fall ', index: 6 },
        { value: 'SPRING ', label: 'Spring ', index: 7 },
        { value: 'SUMMER ', label: 'Summer ', index: 8 },
        { value: 'FALL ', label: 'Fall ', index: 9 }
    ]

    let date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;

    for (let index = 0; index < semesters.length; index++) {
        const semester = semesters[index];
        if (semester.index >= 7) {
            semester.label += currentYear + 1
            semester.value += currentYear + 1
        }
        else if (semester.index < 4) {
            semester.label += currentYear - 1
            semester.value += currentYear - 1
        }
        else {
            semester.label += currentYear
            semester.value += currentYear
        }
    }

    // Lấy học kỳ hiện tại
    let currentSemesterValue: string;

    if (1 <= currentMonth && currentMonth < 5) {
        currentSemesterValue = "SPRING " + currentYear;
    }
    else if (5 <= currentMonth && currentMonth < 9)
        currentSemesterValue = "SUMMER " + currentYear;
    else
        currentSemesterValue = "FALL " + currentYear;

    // Thêm giá trị mặc định vào đầu mảng
    semesters.unshift({ value: "", label: "Theo học kỳ", index: 0 });

    return (
        <>
            <SelectBox
                id="semester"
                name="semester"
                disableDefaultOption={true}
                options={semesters}
                defaultValue={currentSemesterValue ? currentSemesterValue : ""}
                onChange={onChange}
            />
        </>
    )
}