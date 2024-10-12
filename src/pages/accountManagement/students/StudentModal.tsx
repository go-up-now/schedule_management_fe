import React, { useState } from "react"
import TextField from '../../../components/TextField.tsx';
import SelectBox from '../../../components/SelectBox.tsx';
import TextArea from '../../../components/TextArea.tsx';

export const StudentModal = () => {
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);


    const openSamplePageInNewTab = () => {
        window.open('https://res.cloudinary.com/deeekoc3r/image/upload/v1728731987/hinhcv_iqkoqs.jpg', '_blank');
    };

    return (
        <form action="/" className="w-full flex flex-wrap">

            <div className="w-full lg:w-5/12 p-1 flex flex-col items-center">
                <label htmlFor="image" className="w-full cursor-pointer">
                    <div className="w-full h-auto border-dashed border-2 border-gray-300 flex items-center justify-center">
                        {imagePreview ? (
                            <img src={imagePreview as string} alt="Preview" className="w-800 h-600 object-cover" />
                        ) : (
                            <div className="w-800 h-600 bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">Avatar [800 x 450]</span>
                            </div>
                        )}
                    </div>
                </label>
                <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    // onChange={handleImageChange}
                    className="hidden"
                />
                {/* {formik.errors.image && formik.touched.image && (
                    <div className='text-red-500'>{formik.errors.image as string}</div>
                )} */}
                <button
                    type="button"
                    className="ml-4 text-blue-500 underline"
                    onClick={openSamplePageInNewTab}
                >
                    Tải ảnh mẫu
                </button>
            </div>
            <div className="w-full lg:w-7/12 flex flex-wrap">
                <div className="w-full lg:w-6/12 p-1">
                    <TextField
                        label="Mã Số Sinh Viên"
                        id="code"
                        width="w-full"
                        disable={false}
                        type="text"
                        disableLabel={false}
                    // className={`w-full ${formik.touched.name && formik.errors.name && 'border-red-500'}`}
                    // {...formik.getFieldProps('name')}
                    />
                    {/* {formik.errors.name && formik.touched.name && (
                        <div className='text-red-500'>{formik.errors.name as string}</div>
                    )} */}
                </div>

                <div className="w-full lg:w-6/12 p-1">
                    <TextField
                        label="Họ Và Tên"
                        id="fullName"
                        width="w-full"
                        disable={false}
                        type="text"
                        disableLabel={false}
                    // className={`p-1 ${formik.touched.hostMark && formik.errors.hostMark && 'border-red-500'}`}
                    // {...formik.getFieldProps('hostMark')}
                    />
                    {/* {formik.errors.hostMark && formik.touched.hostMark && (
                        <div className='text-red-500'>{formik.errors.hostMark as string}</div>
                    )} */}
                </div>

                <div className="w-full lg:w-6/12 p-1">
                    <TextField
                        label="Email"
                        id="email"
                        width="w-full"
                        disable={false}
                        type="text"
                        disableLabel={false}
                    // className={`p-1 ${formik.touched.hostMark && formik.errors.hostMark && 'border-red-500'}`}
                    // {...formik.getFieldProps('hostMark')}
                    />
                    {/* {formik.errors.hostMark && formik.touched.hostMark && (
                        <div className='text-red-500'>{formik.errors.hostMark as string}</div>
                    )} */}
                </div>
                <div className="w-full lg:w-6/12 p-1">
                    <TextField
                        label="Mật Khẩu"
                        id="password"
                        width="w-full"
                        disable={false}
                        type="password"
                        disableLabel={false}
                    // className={`p-1 ${formik.touched.hostMark && formik.errors.hostMark && 'border-red-500'}`}
                    // {...formik.getFieldProps('hostMark')}
                    />
                    {/* {formik.errors.hostMark && formik.touched.hostMark && (
                        <div className='text-red-500'>{formik.errors.hostMark as string}</div>
                    )} */}
                </div>
                <div className="w-full lg:w-6/12 p-1">
                    <TextField
                        label="Số điện thoại"
                        id="phone"
                        width="w-full"
                        disable={false}
                        type="number"
                        disableLabel={false}
                    // className={`w-full ${formik.touched.endTime && formik.errors.endTime && 'border-red-500'}`}
                    // value={formik.values.endTime}
                    // onChange={formik.handleChange}
                    />
                    {/* {formik.errors.endTime && formik.touched.endTime && (
                        <div className='text-red-500'>{formik.errors.endTime as string}</div>
                    )} */}
                </div>
                <div className="w-full lg:w-6/12 p-1">
                    <TextField
                        label="Địa Chỉ"
                        id="address"
                        width="w-full"
                        disable={false}
                        type="text"
                        disableLabel={false}
                    // className={`w-full ${formik.touched.place && formik.errors.place && 'border-red-500'}`}
                    // {...formik.getFieldProps('place')}
                    />
                    {/* {formik.errors.place && formik.touched.place && (
                        <div className='text-red-500'>{formik.errors.place as string}</div>
                    )} */}
                </div>
                <div className="w-full lg:w-6/12 p-1">
                    <TextField
                        label="Ngày Sinh"
                        id="birthday"
                        width="w-full"
                        disable={false}
                        type="date"
                        disableLabel={false}
                    // className={`w-full ${formik.touched.beginTime && formik.errors.beginTime && 'border-red-500'}`}
                    // value={formik.values.beginTime}
                    // onChange={formik.handleChange}
                    />
                    {/* {formik.errors.beginTime && formik.touched.beginTime && (
                        <div className='text-red-500'>{formik.errors.beginTime as string}</div>
                    )} */}
                </div>

                <div className="w-full lg:w-6/12 p-1">
                    <TextField
                        label="Thời Gian Nhập Học"
                        id="enterSchool"
                        width="w-full"
                        disable={false}
                        type="date"
                        disableLabel={false}
                    // className={`w-full ${formik.touched.beginTime && formik.errors.beginTime && 'border-red-500'}`}
                    // value={formik.values.beginTime}
                    // onChange={formik.handleChange}
                    />
                    {/* {formik.errors.beginTime && formik.touched.beginTime && (
                        <div className='text-red-500'>{formik.errors.beginTime as string}</div>
                    )} */}
                </div>
                <div className="w-full lg:w-4/12 p-1">
                    <SelectBox
                        options={[
                            { value: 1, label: "Spring 2024" },
                            { value: 2, label: "Summer 2024" },
                            { value: 2, label: "Fall 2024" }
                        ]}
                        id="semester"
                        name="semester"
                        defaultOptionValue={"Chọn Học Kỳ"}
                        customClassName={'w-full'}
                    // defaultValue={formik.values.semester || undefined}
                    // customClassName={`w-full ${formik.touched.semester && formik.errors.semester && 'border-red-500'}`}
                    // onChange={(value) => formik.setFieldValue('semester', value.target.value)}
                    />
                    {/* {formik.errors.semester && formik.touched.semester && (
                        <div className='text-red-500'>{formik.errors.semester as string}</div>
                    )} */}
                </div>
                <div className="w-full lg:w-4/12 p-1">
                    <SelectBox
                        options={[
                            { value: 1, label: "WEB 2023" },
                            { value: 2, label: "QTKD 2022" }
                        ]}
                        id="education_program"
                        name="education_program"
                        defaultOptionValue={"Chương Trình Đào Tạo"}
                        customClassName={'w-full'}
                    // defaultValue={formik.values.semester || undefined}
                    // customClassName={`w-full ${formik.touched.semester && formik.errors.semester && 'border-red-500'}`}
                    // onChange={(value) => formik.setFieldValue('semester', value.target.value)}
                    />
                    {/* {formik.errors.semester && formik.touched.semester && (
                        <div className='text-red-500'>{formik.errors.semester as string}</div>
                    )} */}
                </div>
                <div className="w-full lg:w-4/12 p-1">
                    <SelectBox
                        options={[
                            { value: 1, label: "Nam" },
                            { value: 0, label: "Nữ" }
                        ]}
                        id="gender"
                        name="gender"
                        defaultOptionValue={"Chọn Giới Tính"}
                        customClassName={'w-full'}
                    // customClassName={`w-full ${formik.touched.year && formik.errors.year && 'border-red-500'}`}
                    // onChange={(value) => {
                    //     formik.setFieldValue('year', value.target.value)
                    // }}
                    />
                    {/* {formik.errors.year && formik.touched.year && (
                        <div className='text-red-500'>{formik.errors.year as string}</div>
                    )} */}
                </div>
                <div className="w-full p-1">
                    <TextArea
                        label="Mô Tả"
                        id="describe"
                        width="w-full"
                        disable={false}
                        disableLabel={false}
                    // className={`w-full ${formik.touched.describe && formik.errors.describe && 'border-red-500'}`}
                    // {...formik.getFieldProps('describe')}
                    />
                    {/* {formik.errors.describe && formik.touched.describe && (
                        <div className='text-red-500'>{formik.errors.describe as string}</div>
                    )} */}
                </div>
            </div>
        </form>
    )
}