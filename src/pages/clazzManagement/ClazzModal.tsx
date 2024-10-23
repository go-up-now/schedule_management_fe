import React, { useState, useEffect } from "react"
import TextField from '../../components/TextField.tsx';
import SelectBox from '../../components/SelectBox.tsx';
import TextArea from '../../components/TextArea.tsx';
import * as Yup from 'yup';
import { FormikProps } from 'formik';
import { isAfter, isEqual, startOfToday, differenceInYears } from 'date-fns';

interface ClazzFormProps {
    formik: FormikProps<any>;
    areaOption?: Array<{ value: string | number | boolean | undefined, label: string | number, disable?: boolean, valueClassName?: string }>;
    educationProgramOption?: Array<{ value: string | number | boolean | undefined, label: string | number, disable?: boolean, valueClassName?: string }>;
    disable?: boolean;
    hidden?: boolean;
    validateSemester?: boolean;
}

export const ClazzSchema = Yup.object().shape({
    id: Yup.number().required(),
    code: Yup.string()
        .required("Vui lòng nhập mã lớp học"),
    quantity: Yup.number()
        .required("Vui lòng nhập số lượng sinh viên")
        .integer('Số lượng phải là số nguyên')
        .positive('Số lượng phải là số dương')
        .typeError('Số lượng phải là số') // Đây là thông báo lỗi khi kiểu dữ liệu không đúng
        .min(35, "Số lượng sinh viên phải ít nhất là 35")
        .max(50, "Số lượng sinh viên phải nhiều nhất là 50"),
    startTime: Yup.date()
        .required("Vui lòng nhập ngày bắt đầu")
        .test('is-valid-date', 'Ngày bắt đầu không được nhỏ hơn ngày hiện tại', function (value) {
            const { id } = this.parent;
            const today = startOfToday(); // Lấy ngày hiện tại (bỏ qua phần giờ phút)
            return id === 0
                ? value
                    ? isAfter(value, today) || isEqual(value, today) // Kiểm tra giá trị là ngày hôm nay hoặc sau hôm nay
                    : true
                : true;
        }),
    endTime: Yup.date()
        .required("Vui lòng nhập ngày kết thúc")
        .test('is-after-startTime', 'Ngày kết thúc phải lớn hơn ngày bắt đầu', function (value) {
            const { startTime, id } = this.parent;
            if (!startTime) {
                return this.createError({ path: 'endTime', message: 'Vui lòng chọn ngày bắt đầu trước' });
            }
            return isAfter(value, startTime);
        }),
    block: Yup.string()
        .required("Vui lòng chọn block"),
    dayOfWeek: Yup.string()
        .required("Vui lòng chọn ngày học trong tuần"),
    shift: Yup.string()
        .required("Vui lòng chọn ca học"),
    subject: Yup.string()
        .required("Vui lòng chọn môn học"),
});

export const ClazzModal: React.FC<ClazzFormProps> = ({
    formik,
    areaOption,
    educationProgramOption,
    disable = false,
    hidden,
    validateSemester = false,
}) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [warningMessage, setWarningMessage] = useState<string | null>(null);
    const [semesterValue, setSemesterValue] = useState<string | null>(null);
    const [IsDisableISelectRoom, setIsDisableISelectRoom] = useState(false);
    const [isDisableOnlineLink, setIsDisableOnlineLink] = useState(false);

    let semester = [
        {
            value: formik.values.semester + " " + formik.values.year,
            label: formik.values.semester + " " + formik.values.year
        }
    ]

    let semesters = [
        {
            value: semesterValue || "",
            label: semesterValue || " Chọn học kỳ"
        }
    ]

    const handleEnterSchool = (event, handleChange) => {
        const date = new Date(event.target.value);
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let semester3 = "SPRING " + year;

        if (1 <= month && month < 5) {
            setSemesterValue("SPRING " + year);
            semester3 = "SPRING " + year;
        }
        else if (5 <= month && month < 9) {
            setSemesterValue("SUMMER " + year);
            semester3 = "SUMMER " + year;
        }
        else {
            setSemesterValue("FALL " + year);
            semester3 = "FALL " + year;
        }

        // Gọi handleChange của Formik để cập nhật form
        handleSemester(event, formik.handleChange, semester3);
        handleChange(event);
    };

    const handleSemester = (event, handleChange, semester) => {
        const [semester2, year2] = semesterValue ? semesterValue.split(' ') : semester.split(' '); // Tách thành 2 giá trị
        formik.setFieldValue('semester', semester2); // Cập nhật vào Formik
        formik.setFieldValue('year', year2); // Cập nhật vào Formik
        handleChange(event);
    }

    const handleOnlineLink = (event, handleChange) => {
        let value = event.target.value;

        // Disable selectbox phòng học
        if (value.length > 0)
            setIsDisableISelectRoom(true);
        else
            setIsDisableISelectRoom(false);

        handleChange(event);
    }

    return (
        <form action="/" className="w-full">
            <div className="w-full h-60 flex flex-wrap h-auto">
                <div className="w-full lg:w-4/12 p-1">
                    <TextField
                        label="Mã Lớp"
                        id="code"
                        width="w-full"
                        disable={disable}
                        type="text"
                        disableLabel={false}
                        className={`w-full ${formik.touched.code && formik.errors.code ? 'border-red-500' : ''}`}
                        {...formik.getFieldProps('code')}
                    />
                    {formik.errors.code && formik.touched.code && (
                        <div className='text-red-500'>{formik.errors.code as string}</div>
                    )}
                </div>

                <div className="w-full lg:w-4/12 p-1">
                    <TextField
                        label="Số Lượng"
                        id="quantity"
                        width="w-full"
                        disable={false}
                        type="text"
                        disableLabel={false}
                        className={`w-full ${formik.touched.quantity && formik.errors.quantity && 'border-red-500'}`}
                        {...formik.getFieldProps('quantity')}
                    />
                    {formik.errors.quantity && formik.touched.quantity && (
                        <div className='text-red-500'>{formik.errors.quantity as string}</div>
                    )}
                </div>
                <div className="w-full lg:w-4/12 p-1">
                    <TextField
                        label="Link Online"
                        id="onlineLink"
                        width="w-full"
                        disable={isDisableOnlineLink}
                        type="text"
                        disableLabel={false}
                        className={`w-full ${formik.touched.onlineLink && formik.errors.onlineLink && 'border-red-500'}`}
                        {...formik.getFieldProps('onlineLink')}
                        onChange={(e) => handleOnlineLink(e, formik.handleChange)}
                    />
                    {formik.errors.onlineLink && formik.touched.onlineLink && (
                        <div className='text-red-500'>{formik.errors.onlineLink as string}</div>
                    )}
                </div>
                <div className="w-full lg:w-4/12 p-1">
                    <TextField
                        label="Ngày Bắt Đầu"
                        id="startTime"
                        width="w-full"
                        disable={false}
                        type="date"
                        disableLabel={false}
                        className={`w-full ${formik.touched.startTime && formik.errors.startTime && 'border-red-500'}`}
                        {...formik.getFieldProps('startTime')}
                        onChange={(e) => handleEnterSchool(e, formik.handleChange)}
                    />
                    {formik.errors.startTime && formik.touched.startTime && (
                        <div className='text-red-500'>{formik.errors.startTime as string}</div>
                    )}
                </div>
                <div className="w-full lg:w-4/12 p-1">
                    <TextField
                        label="Ngày Kết Thúc"
                        id="endTime"
                        width="w-full"
                        disable={false}
                        type="date"
                        disableLabel={false}
                        className={`w-full ${formik.touched.endTime && formik.errors.endTime && 'border-red-500'}`}
                        {...formik.getFieldProps('endTime')}
                    />
                    {formik.errors.endTime && formik.touched.endTime && (
                        <div className='text-red-500'>{formik.errors.endTime as string}</div>
                    )}
                </div>
                <div className="w-full lg:w-4/12 p-1">
                    <SelectBox
                        options={validateSemester ? semester : semesters}
                        id="semester"
                        name="semester"
                        disable={true}
                        defaultOptionValue={"Chọn Học Kỳ"}
                        defaultValue={formik.values.semester + " " + formik.values.year || undefined}
                        customClassName={`w-full ${formik.touched.semester && formik.errors.semester && 'border-red-500'}`}
                        onChange={(e) => handleSemester(e, formik.handleChange, semester)}
                    />
                    {formik.errors.semester && formik.touched.semester && (
                        <div className='text-red-500'>{formik.errors.semester as string}</div>
                    )}
                </div>
                <div className="w-full lg:w-4/12 p-1">
                    <SelectBox
                        options={[
                            { value: 1, label: "Block 1" },
                            { value: 2, label: "Block 2" }
                        ]}
                        id="block"
                        name="block"
                        defaultOptionValue={"Chọn Block"}
                        defaultValue={formik.values.block}
                        customClassName={`w-full ${formik.touched.block && formik.errors.block && 'border-red-500'}`}
                        onChange={(value) => {
                            formik.setFieldValue('block', value.target.value)
                        }}
                    />
                    {formik.errors.block && formik.touched.block && (
                        <div className='text-red-500'>{formik.errors.block as string}</div>
                    )}
                </div>
                <div className="w-full lg:w-4/12 p-1">
                    <SelectBox
                        options={[
                            { value: '2, 4, 6', label: '2, 4, 6' },
                            { value: '3, 5, 7', label: '3, 5, 7' }
                        ]}
                        id="dayOfWeek"
                        name="dayOfWeek"
                        defaultOptionValue={"Ngày Học Trong Tuần"}
                        // defaultValue={formik.values.dayOfWeek}
                        customClassName={`w-full ${formik.touched.dayOfWeek && formik.errors.dayOfWeek && 'border-red-500'}`}
                        onChange={(value) => {
                            formik.setFieldValue('dayOfWeek', value.target.value)
                        }}
                    />
                    {formik.errors.dayOfWeek && formik.touched.dayOfWeek && (
                        <div className='text-red-500'>{formik.errors.dayOfWeek as string}</div>
                    )}
                </div>
                <div className="w-full lg:w-4/12 p-1">
                    <SelectBox
                        options={educationProgramOption}
                        id="room"
                        name="room"
                        disable={IsDisableISelectRoom}
                        defaultOptionValue={"Chọn Phòng Học"}
                        defaultValue={formik.values.room || undefined}
                        customClassName={`w-full ${formik.touched.room && formik.errors.room && 'border-red-500'}`}
                        onChange={(value) => {
                            formik.setFieldValue('room', value.target.value)
                            setIsDisableOnlineLink(true)
                        }}
                    // onChange={(value) => handleRoom(value)}
                    />
                    {formik.errors.room && formik.touched.room && (
                        <div className='text-red-500'>{formik.errors.room as string}</div>
                    )}
                </div>
                <div className="w-full lg:w-4/12 p-1">
                    <SelectBox
                        options={educationProgramOption}
                        id="shift"
                        name="shift"
                        defaultOptionValue={"Chọn Ca Học"}
                        defaultValue={formik.values.shift || undefined}
                        customClassName={`w-full ${formik.touched.shift && formik.errors.shift && 'border-red-500'}`}
                        onChange={(value) => formik.setFieldValue('shift', value.target.value)}
                    />
                    {formik.errors.shift && formik.touched.shift && (
                        <div className='text-red-500'>{formik.errors.shift as string}</div>
                    )}
                </div>
                <div className="w-full lg:w-4/12 p-1">
                    <SelectBox
                        options={educationProgramOption}
                        id="subject"
                        name="subject"
                        defaultOptionValue={"Chọn Môn Học"}
                        defaultValue={formik.values.subject || undefined}
                        customClassName={`w-full ${formik.touched.subject && formik.errors.subject && 'border-red-500'}`}
                        onChange={(value) => formik.setFieldValue('subject', value.target.value)}
                    />
                    {formik.errors.subject && formik.touched.subject && (
                        <div className='text-red-500'>{formik.errors.subject as string}</div>
                    )}
                </div>
                <div className="w-full lg:w-4/12 p-1">
                    <SelectBox
                        options={educationProgramOption}
                        id="instructorCode"
                        name="instructorCode"
                        defaultOptionValue={"Chọn Giảng Viên"}
                        defaultValue={formik.values.instructorCode || undefined}
                        customClassName={`w-full ${formik.touched.instructorCode && formik.errors.instructorCode && 'border-red-500'}`}
                        onChange={(value) => formik.setFieldValue('instructorCode', value.target.value)}
                    />
                    {formik.errors.instructorCode && formik.touched.instructorCode && (
                        <div className='text-red-500'>{formik.errors.instructorCode as string}</div>
                    )}
                </div>
            </div>
        </form>
    )
}