import React, { useState, useEffect } from "react"
import TextField from '../../../components/TextField.tsx';
import SelectBox from '../../../components/SelectBox.tsx';
import TextArea from '../../../components/TextArea.tsx';
import * as Yup from 'yup';
import { FormikProps } from 'formik';
import { isAfter, isEqual, startOfToday, differenceInYears } from 'date-fns';

interface StudentFormProps {
    formik: FormikProps<any>;
    areaOption?: Array<{ value: string | number | boolean | undefined, label: string | number, disable?: boolean, valueClassName?: string }>;
    educationProgramOption?: Array<{ value: string | number | boolean | undefined, label: string | number, disable?: boolean, valueClassName?: string }>;
    disable?: boolean;
    hidden?: boolean;
    validateSemester?: boolean;
}

export const StudentSchema = Yup.object().shape({
    id: Yup.number().required(),
    enterSchool: Yup.date()
        .required("Vui lòng nhập ngày nhập học")
        .test('is-valid-date', 'Ngày nhập học không được nhỏ hơn ngày hiện tại', function (value) {
            const { id } = this.parent;
            const today = startOfToday(); // Lấy ngày hiện tại (bỏ qua phần giờ phút)
            return id === 0
                ? value
                    ? isAfter(value, today) || isEqual(value, today) // Kiểm tra giá trị là ngày hôm nay hoặc sau hôm nay
                    : true
                : true;
        }),
    education_program: Yup.string()
        .required("Vui lòng chọn CTĐT"),
    user: Yup.object().shape({
        code: Yup.string().required('Vui lòng nhập mã sinh viên'),
        lastName: Yup.string().required("Vui lòng nhập họ sinh viên"),
        firstName: Yup.string().required("Vui lòng nhập tên sinh viên"),
        email: Yup.string().required("Vui lòng nhập email")
            .email('Email không hợp lệ'),
        password: Yup.string()
            .required("Vui lòng nhập mật khẩu")
            .length(5, 'Mật khẩu phải ít nhất 5 ký tự'),
        phone: Yup.string().required("Vui lòng nhập số điện thoại")
            .matches(/^0[0-9]+$/, "Số điện thoại không hợp lệ")
            .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
            .max(11, "Số điện thoại chỉ được có tối đa 11 chữ số"),
        address: Yup.string().required("Vui lòng nhập địa chỉ")
            .max(100, 'Địa chỉ không vượt quá 100 ký tự'),
        birthday: Yup.date()
            .required('Vui lòng nhập ngày sinh')
            .test('is-18-years-old', 'Bạn phải ít nhất 18 tuổi', function (value) {
                const today = new Date(); // Ngày hiện tại
                return value ? differenceInYears(today, value) >= 18 : false; // Kiểm tra nếu tuổi >= 18
            }),
        area: Yup.string().required("Vui lòng chọn khu vực"),
        gender: Yup.number()
            .required("Vui lòng chọn giới tính"),
        description: Yup.string().nullable(),
    })
});

export const StudentModal: React.FC<StudentFormProps> = ({
    formik,
    areaOption,
    educationProgramOption,
    disable = false,
    hidden,
    validateSemester = false,
}) => {
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const [warningMessage, setWarningMessage] = useState<string | null>(null);
    const [semesterValue, setSemesterValue] = useState<string | null>(null);

    const openSamplePageInNewTab = () => {
        window.open('https://res.cloudinary.com/deeekoc3r/image/upload/v1728731987/hinhcv_iqkoqs.jpg', '_blank');
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            console.log(file)
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = async () => {
                if (img.width < 800 || img.height < 1000) {
                    setWarningMessage("Kích thước ảnh phải ít nhất 800x1000");

                } else {
                    setWarningMessage(null);
                }

                // try {
                //   const result = await uploadImage(file, presetName[0], formik.values.name || null);
                //   const imageUrl = result.secure_url;
                //   setImagePreview(imageUrl);
                //   formik.setFieldValue('image', imageUrl);
                // } catch (error) {
                //   console.error('Upload error:', error);
                // }

            };
        }
    };

    // Tạo tự động semester theo year
    // let semesters = [
    //     { value: 'SPRING ', label: 'Spring ', index: 1 },
    //     { value: 'SUMMER ', label: 'Summer ', index: 2 },
    //     { value: 'FALL ', label: 'Fall ', index: 3 },
    //     { value: 'SPRING ', label: 'Spring ', index: 4 },
    //     { value: 'SUMMER ', label: 'Summer ', index: 5 },
    //     { value: 'FALL ', label: 'Fall ', index: 6 }
    // ]
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

    return (
        <form action="/" className="w-full flex flex-wrap">
            <div className="w-full lg:w-4/12 p-1 flex flex-col items-center">
                <label htmlFor="avatar" className="w-full cursor-pointer">
                    <div className="w-full h-52 border-dashed border-2 border-gray-300 flex items-center justify-center">
                        {imagePreview ? (
                            <img src={imagePreview as string} alt="Preview" className="w-800 h-600 object-cover" />
                        ) : (
                            <div className="w-800 h-600 bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">Avatar [800 x 1000]</span>
                            </div>
                        )}
                    </div>
                </label>
                <input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleImageChange}
                    className="hidden"
                />
                {formik.errors.avatar && formik.touched.avatar && (
                    <div className='text-red-500'>{formik.errors.avatar as string}</div>
                )}
                <button
                    type="button"
                    className="ml-4 text-blue-500 underline"
                    onClick={openSamplePageInNewTab}
                >
                    Tải ảnh mẫu
                </button>
                <div className="w-full flex flex-wrap">
                    <div className="w-full mt-2 p-1">
                        <TextField
                            label="Quê Quán"
                            id="user.address"
                            width="w-full"
                            disable={false}
                            type="text"
                            disableLabel={false}
                            className={`w-full ${formik.touched.user?.address && formik.errors.user?.address && 'border-red-500'}`}
                            {...formik.getFieldProps('user.address')}
                        />
                        {formik.errors.user?.address && formik.touched.user?.address && (
                            <div className='text-red-500'>{formik.errors.user?.address as string}</div>
                        )}
                    </div>
                    <div className="w-full lg:w-6/12 p-1">
                        <SelectBox
                            options={areaOption}
                            id="user.area"
                            name="user.area"
                            defaultOptionValue={"Chọn Khu Vực"}
                            defaultValue={formik.values.user?.area || undefined}
                            customClassName={`w-full ${formik.touched.user?.area && formik.errors.user?.area && 'border-red-500'}`}
                            onChange={(value) => formik.setFieldValue('user.area', value.target.value)}
                        />
                        {formik.errors.user?.area && formik.touched.user?.area && (
                            <div className='text-red-500'>{formik.errors.user?.area as string}</div>
                        )}
                    </div>
                    <div className="w-full lg:w-6/12 p-1">
                        <SelectBox
                            options={validateSemester ? semester : semesters}
                            id="semester"
                            name="semester"
                            disable={true}
                            defaultOptionValue={"Chọn Học Kỳ"}
                            defaultValue={formik.values.semester + " " + formik.values.year || undefined}
                            customClassName={`w-full ${formik.touched.semester && formik.errors.semester && 'border-red-500'}`}
                            // onChange={(value) => {
                            //     // handleSemester
                            //     const [semester2, year2] = semesterValue ? semesterValue.split(' ') : ""; // Tách thành 2 giá trị
                            //     formik.setFieldValue('semester', semester2); // Cập nhật vào Formik
                            //     formik.setFieldValue('year', year2); // Cập nhật vào Formik
                            // }}
                            onChange={(e) => handleSemester(e, formik.handleChange, semester)}
                        />
                        {formik.errors.semester && formik.touched.semester && (
                            <div className='text-red-500'>{formik.errors.semester as string}</div>
                        )}
                    </div>
                    <div className="w-full lg:w-6/12 p-1">
                        <SelectBox
                            options={educationProgramOption}
                            id="education_program"
                            name="education_program"
                            defaultOptionValue={"CT Đào Tạo"}
                            defaultValue={formik.values.education_program || undefined}
                            customClassName={`w-full ${formik.touched.education_program && formik.errors.education_program && 'border-red-500'}`}
                            onChange={(value) => formik.setFieldValue('education_program', value.target.value)}
                        />
                        {formik.errors.education_program && formik.touched.education_program && (
                            <div className='text-red-500'>{formik.errors.education_program as string}</div>
                        )}
                    </div>
                    <div className="w-full lg:w-6/12 p-1">
                        <SelectBox
                            options={[
                                { value: 1, label: "Nam" },
                                { value: 0, label: "Nữ" }
                            ]}
                            id="user.gender"
                            name="user.gender"
                            defaultOptionValue={"Chọn Giới Tính"}
                            defaultValue={formik.values.user.gender}
                            customClassName={`w-full ${formik.touched.user?.gender && formik.errors.user?.gender && 'border-red-500'}`}
                            onChange={(value) => {
                                formik.setFieldValue('user.gender', value.target.value)
                            }}
                        />
                        {formik.errors.user?.gender && formik.touched.user?.gender && (
                            <div className='text-red-500'>{formik.errors.user?.gender as string}</div>
                        )}
                    </div>
                </div>

            </div>
            <div className="w-full h-60 lg:w-8/12 flex flex-wrap">
                <div className="w-full lg:w-6/12 p-1">
                    <TextField
                        label="Mã Số Sinh Viên"
                        id="user.code"
                        width="w-full"
                        disable={disable}
                        type="text"
                        disableLabel={false}
                        className={`w-full ${formik.touched.user?.code && formik.errors.user?.code ? 'border-red-500' : ''}`}
                        {...formik.getFieldProps('user.code')}
                    />
                    {formik.errors.user?.code && formik.touched.user?.code && (
                        <div className='text-red-500'>{formik.errors.user.code as string}</div>
                    )}
                </div>

                <div className="w-full lg:w-6/12 p-1">
                    <TextField
                        label="Họ Sinh Viên"
                        id="user.lastName"
                        width="w-full"
                        disable={false}
                        type="text"
                        disableLabel={false}
                        className={`w-full ${formik.touched.user?.lastName && formik.errors.user?.lastName && 'border-red-500'}`}
                        {...formik.getFieldProps('user.lastName')}
                    />
                    {formik.errors.user?.lastName && formik.touched.user?.lastName && (
                        <div className='text-red-500'>{formik.errors.user?.lastName as string}</div>
                    )}
                </div>
                <div className="w-full lg:w-6/12 p-1">
                    <TextField
                        label="Tên Sinh Viên"
                        id="user.firstName"
                        width="w-full"
                        disable={false}
                        type="text"
                        disableLabel={false}
                        className={`w-full ${formik.touched.user?.firstName && formik.errors.user?.firstName && 'border-red-500'}`}
                        {...formik.getFieldProps('user.firstName')}
                    />
                    {formik.errors.user?.firstName && formik.touched.user?.firstName && (
                        <div className='text-red-500'>{formik.errors.user?.firstName as string}</div>
                    )}
                </div>

                <div className="w-full lg:w-6/12 p-1">
                    <TextField
                        label="Email"
                        id="user.email"
                        width="w-full"
                        disable={disable}
                        type="text"
                        disableLabel={false}
                        className={`w-full ${formik.touched.user?.email && formik.errors.user?.email && 'border-red-500'}`}
                        {...formik.getFieldProps('user.email')}
                    />
                    {formik.errors.user?.email && formik.touched.user?.email && (
                        <div className='text-red-500'>{formik.errors.user?.email as string}</div>
                    )}
                </div>
                <div className="w-full lg:w-6/12 p-1">
                    <TextField
                        label="Mật Khẩu"
                        id="user.password"
                        width="w-full"
                        disable={disable}
                        hidden={hidden}
                        type="password"
                        disableLabel={false}
                        className={`w-full ${formik.touched.user?.password && formik.errors.user?.password && 'border-red-500'}`}
                        {...formik.getFieldProps('user.password')}
                    />
                    {formik.errors.user?.password && formik.touched.user?.password && (
                        <div className='text-red-500'>{formik.errors.user?.password as string}</div>
                    )}
                </div>
                <div className="w-full lg:w-6/12 p-1">
                    <TextField
                        label="Số điện thoại"
                        id="user.phone"
                        width="w-full"
                        disable={false}
                        type="text"
                        disableLabel={false}
                        className={`w-full ${formik.touched.user?.phone && formik.errors.user?.phone && 'border-red-500'}`}
                        {...formik.getFieldProps('user.phone')}
                    />
                    {formik.errors.user?.phone && formik.touched.user?.phone && (
                        <div className='text-red-500'>{formik.errors.user?.phone as string}</div>
                    )}
                </div>
                <div className="w-full lg:w-6/12 p-1">
                    <TextField
                        label="Ngày Sinh"
                        id="user.birthday"
                        width="w-full"
                        disable={false}
                        type="date"
                        disableLabel={false}
                        className={`w-full ${formik.touched.user?.birthday && formik.errors.user?.birthday && 'border-red-500'}`}
                        {...formik.getFieldProps('user.birthday')}
                    />
                    {formik.errors.user?.birthday && formik.touched.user?.birthday && (
                        <div className='text-red-500'>{formik.errors.user?.birthday as string}</div>
                    )}
                </div>

                <div className="w-full lg:w-6/12 p-1">
                    <TextField
                        label="Thời Gian Nhập Học"
                        id="enterSchool"
                        width="w-full"
                        disable={false}
                        type="date"
                        disableLabel={false}
                        className={`w-full ${formik.touched.enterSchool && formik.errors.enterSchool && 'border-red-500'}`}
                        {...formik.getFieldProps('enterSchool')}
                        onChange={(e) => handleEnterSchool(e, formik.handleChange)}
                    />
                    {formik.errors.enterSchool && formik.touched.enterSchool && (
                        <div className='text-red-500'>{formik.errors.enterSchool as string}</div>
                    )}
                </div>

                <div className="w-full p-1">
                    <TextArea
                        label="Mô Tả"
                        id="user.description"
                        width="w-full "
                        rows={3}
                        disable={false}
                        disableLabel={false}
                        className={`w-full ${formik.touched.user?.description && formik.errors.user?.description && 'border-red-500'}`}
                        {...formik.getFieldProps('user.description')}
                    />
                    {formik.errors.user?.description && formik.touched.user?.description && (
                        <div className='text-red-500'>{formik.errors.user?.description as string}</div>
                    )}
                </div>
            </div>
        </form>
    )
}