import React from "react";
import TextField from "../../components/TextField.tsx";
import { formattedSelectedDate } from "../../utilss/convertDateAndString";

const SubjectDetailPage = (props) => {
    const { clazz, subject } = props;
    return (
        <div className="w-full">
            <div className="w-full flex flex-wrap">
                {/* <div className="w-full lg:w-6/12 p-1 flex flex-col items-center">
                    <label className="w-full cursor-pointer">
                        <div className="w-full h-auto border-dashed border-2 border-gray-300 flex items-center justify-center">
                        
                            <img
                                src={"DEFAULT_IMAGE_CHUYEN_MON"}
                                alt="Preview"
                                className="w-auto h-[250px] lg:w-[800px] h-[450px] object-cover"
                            />
                           
                        </div>
                    </label>
                </div> */}
                <div className="w-full lg:w-full p-1 mt-10 flex flex-wrap">
                    <div className="w-full lg:w-6/12 p-1">
                        <TextField
                            label="Mã Môn Học"
                            id="code"
                            name="code"
                            width="w-full"
                            type="text"
                            disableLabel={false}
                            className="p-1"
                            value={subject.code}
                            readOnly={true}
                        />
                    </div>
                    <div className="w-full lg:w-6/12 p-1">
                        <TextField
                            label="Tên Môn học"
                            id="name"
                            name="name"
                            width="w-full"
                            disable={false}
                            type="text"
                            disableLabel={false}
                            className="p-1"
                            value={subject.name}
                            readOnly={true}
                        />
                    </div>
                    <div className="w-full lg:w-6/12 p-1">
                        <TextField
                            label="Số Tín Chỉ"
                            id="start_date"
                            name="start_date"
                            width="w-full"
                            disable={false}
                            type="text"
                            disableLabel={false}
                            className="p-1"
                            value={subject.credits}
                            readOnly={true}
                        />
                    </div>
                    <div className="w-full lg:w-6/12 p-1">
                        <TextField
                            label="Tên Lớp Học"
                            id="end_date"
                            name="end_date"
                            width="w-full"
                            disable={false}
                            type="text"
                            disableLabel={false}
                            value={clazz.code}
                            className="p-1"
                            readOnly={true}
                        />
                    </div>
                    <div className="w-full lg:w-6/12 p-1">
                        <TextField
                            label="Phòng Học"
                            id="join_number"
                            name="join_number"
                            width="w-full"
                            disable={false}
                            type="text"
                            disableLabel={false}
                            className="p-1"
                            value={clazz.onlineLink ? clazz.onlineLink : clazz.room}
                            readOnly={true}
                        />
                    </div>
                    <div className="w-full lg:w-6/12 p-1">
                        <TextField
                            label="Ca Học"
                            id="host_mark"
                            name="host_mark"
                            width="w-full"
                            disable={false}
                            type="text"
                            disableLabel={false}
                            value={clazz.shiftID}
                            className="p-1"
                            readOnly={true}
                        />
                    </div>
                    <div className="w-full lg:w-6/12 p-1">
                        <TextField
                            label="Số Lượng Sinh Viên"
                            id="join_mark"
                            name="join_mark"
                            width="w-full"
                            disable={false}
                            type="text"
                            disableLabel={false}
                            value={clazz.students ? clazz.students.length + "/" + clazz.quantity : ""}
                            className="p-1"
                            readOnly={true}
                        />
                    </div>
                    <div className="w-full lg:w-6/12 p-1">
                        <TextField
                            label="Học kỳ"
                            id="type"
                            name="type"
                            width="w-full"
                            disable={false}
                            type="text"
                            disableLabel={false}
                            value={clazz.semester}
                            className="p-1"
                            readOnly={true}
                        />
                    </div>

                    <div className="w-full lg:w-6/12 p-1">
                        <TextField
                            label="Ngày Bắt Đầu"
                            id="place"
                            name="place"
                            width="w-full"
                            disable={false}
                            type="text"
                            disableLabel={false}
                            className="p-1"
                            value={formattedSelectedDate(clazz.startTime)}
                            readOnly={true}
                        />
                    </div>
                    <div className=" w-full lg:w-6/12 p-1">
                        <TextField
                            label="Ngày Học Trong Tuần"
                            id="description"
                            name="description"
                            width="w-full"
                            type="text"
                            disable={false}
                            disableLabel={false}
                            className="p-1"
                            value={clazz.dayOfWeek}
                            readOnly={true}
                        />
                    </div>
                </div>

            </div>

        </div>
    )
}
export default SubjectDetailPage;