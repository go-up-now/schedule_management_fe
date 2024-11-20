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
                <div className="w-full lg:w-full p-1 flex flex-wrap">
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
                            disable={true}
                        />
                    </div>
                    <div className="w-full lg:w-6/12 p-1">
                        <TextField
                            label="Tên Môn học"
                            id="name"
                            name="name"
                            width="w-full"
                            disable={true}
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
                            id="credits"
                            name="credits"
                            width="w-full"
                            disable={true}
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
                            id="clazzName"
                            name="clazzName"
                            width="w-full"
                            disable={true}
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
                            id="room"
                            name="room"
                            width="w-full"
                            disable={true}
                            type="text"
                            disableLabel={false}
                            className="p-1"
                            value={clazz.onlineLink ? clazz.onlineLink : clazz.room ? clazz.room.room : clazz.room}
                            readOnly={true}
                        />
                    </div>
                    <div className="w-full lg:w-6/12 p-1">
                        <TextField
                            label="Ca Học"
                            id="shift"
                            name="shift"
                            width="w-full"
                            disable={true}
                            type="text"
                            disableLabel={false}
                            value={clazz.shift.id}
                            className="p-1"
                            readOnly={true}
                        />
                    </div>
                    <div className="w-full lg:w-6/12 p-1">
                        <TextField
                            label="Số Lượng Sinh Viên"
                            id="quantity"
                            name="quantity"
                            width="w-full"
                            disable={true}
                            type="text"
                            disableLabel={false}
                            value={clazz.studyIns ? clazz.studyIns.length + "/" + clazz.quantity : ""}
                            className="p-1"
                            readOnly={true}
                        />
                    </div>
                    <div className="w-full lg:w-6/12 p-1">
                        <TextField
                            label="Học kỳ"
                            id="semester"
                            name="semester"
                            width="w-full"
                            disable={true}
                            type="text"
                            disableLabel={false}
                            value={clazz.semester}
                            className="p-1"
                            readOnly={true}
                        />
                    </div>
                    <div className="w-full lg:w-6/12 p-1">
                        <TextField
                            label="Block"
                            id="block"
                            name="block"
                            width="w-full"
                            disable={true}
                            type="text"
                            disableLabel={false}
                            value={clazz.block}
                            className="p-1"
                            readOnly={true}
                        />
                    </div>
                    <div className=" w-full lg:w-6/12 p-1">
                        <TextField
                            label="Ngày Học Trong Tuần"
                            id="dayOfWeek"
                            name="dayOfWeek"
                            width="w-full"
                            type="text"
                            disable={true}
                            disableLabel={false}
                            className="p-1"
                            value={clazz.dayOfWeek}
                            readOnly={true}
                        />
                    </div>

                    <div className="w-full lg:w-6/12 p-1">
                        <TextField
                            label="Ngày Bắt Đầu"
                            id="startTime"
                            name="startTime"
                            width="w-full"
                            disable={true}
                            type="text"
                            disableLabel={false}
                            className="p-1"
                            value={formattedSelectedDate(clazz.startTime)}
                            readOnly={true}
                        />
                    </div>
                    <div className="w-full lg:w-6/12 p-1">
                        <TextField
                            label="Ngày Kết Thúc"
                            id="endTime"
                            name="endTime"
                            width="w-full"
                            disable={true}
                            type="text"
                            disableLabel={false}
                            className="p-1"
                            value={formattedSelectedDate(clazz.endTime)}
                            readOnly={true}
                        />
                    </div>

                </div>

            </div>

        </div>
    )
}
export default SubjectDetailPage;