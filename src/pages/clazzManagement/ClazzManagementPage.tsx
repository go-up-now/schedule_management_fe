import React, { useState, useEffect } from "react";
import TitleHeader from "../../components/TitleHeader.tsx";
import Button from "../../components/Button.tsx";
import SelectBox from "../../components/SelectBox.tsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Tables from "../../components/tables/Tables.tsx";
import CardBox from "../../components/CartBox.tsx";
import { faEllipsis, faFile, faPlus, faPen, faTrash, faCircleExclamation, faSchoolFlag, faSchoolCircleCheck, faSchoolLock } from '@fortawesome/free-solid-svg-icons';
import { getAllClazzAPI, createClazzAPI, updateClazzAPI, deleteClazzAPI, importExcelClazzAPI } from "../../services/ClazzService.js";
import { getAllAreas } from "../../services/areaService.js";
import { getAllSpecializationAPI } from "../../services/SpecializationService.js";
import useHoverModal from "../../hooks/useHoverModal.ts";
import Popover from "../../components/Popover.tsx";
import Container from "../../components/Container.tsx"
import { useSelector } from 'react-redux';
import { Semesters } from '../../utilss/semestersUtils.tsx'
import Modal from "../../components/Modal.tsx";
import { ClazzModal } from "./ClazzModal.tsx";
import { useFormik } from 'formik';
import { ClazzSchema } from './ClazzModal.tsx'
import ModalConfirm from '../../components/ModalConfirm.tsx'
import useConfirm from "../../hooks/useConfirm";
import { toast } from 'react-toastify';
import { getAllEducationProgramAPI } from '../../services/educationProgramService.js'
import UploadExcelModal from '../../components/excel/UpLoadExcel.tsx'
import Spinner from '../../components/Spinner.tsx'
import { getAllSubjectAPI } from '../../services/SubjectSerivce.js'
import { getAllInstructorByAreaAPI } from '../../services/instructorService.js'

interface Subject {
    id: number;
    code: string;
    name: string;
    specialization: Specialization;
}

interface Room {
    id: number;
    room: string;
}

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
    shift: string | number;
    activityStatus: string;
    subject: Subject;
    room: Room;
}

interface EducationProgram {
    code: string;
    name: string;
}

interface Instructor {
    id: number;
    user: User;
    specialization: Specialization;
}

interface User {
    code: string;
    lastName: string;
    firstName: string;
    area: Area;
}

interface Specialization {
    code: string;
    name: string;
}

interface Area {
    id: number | string;
    name: string;
}

const ClazzManagementPage = () => {
    const [listClazz, setListClazz] = useState<Clazz[]>([]);
    const [listClazzAPI, setListClazzAPI] = useState([]);
    const [listAreas, setListAreas] = useState<Area[]>([]);
    const [listSpecializaton, setListSpecializaton] = useState<Specialization[]>([]);
    const [listActivityClazz, setListActivityClazz] = useState([]);
    const [listUnActivityClazz, setListUnActivityClazz] = useState([]);
    const getPosition = (rect: DOMRect) => ({ top: rect.top + window.scrollY - 10, left: rect.left + rect.width - 200 });
    const { handleMouseEnter, targetValue } = useHoverModal(getPosition);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const userInfo = useSelector((state) => state.user.userInfo);
    const [selectedArea, setSelectedArea] = useState(userInfo && userInfo.user ? userInfo.user.area.id : userInfo ? userInfo.area.id : "0"); // Giá trị mặc định
    const [selectedBlock, setSelectedBlock] = useState("")
    const [selectedSemester, setSelectedSemester] = useState(['0']);
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [isModalOpenInsert, setIsModalOpenInsert] = useState(false);
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
    const [isModalOpenConfirm, setIsModalConfirmOpen] = useState(false);
    const [isModalOpenExcel, setIsModalOpenExcel] = useState(false);
    const { isConfirmOpen, openConfirm, closeConfirm, confirmAction, confirmQuestion } = useConfirm();
    const [isClazz, setIsClazz] = useState<Clazz | null>(null);
    const [isReLoadTable, setIsReLoadTable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listSubject, setListSubject] = useState<Subject[]>([]);
    const [listInstructor, setListInstructor] = useState<Instructor[]>([]);

    const clazzs: Clazz[] = listClazz.length > 0 ? listClazz : listClazz;

    const renderRow = (item: Clazz) => [
        // <th key={`item-id-${item.id}`} className="px-6 py-4">{item.id}</th>,
        <td key={`item-clazz-code-${item.id}`} className="px-6 py-4">{item.code}</td>,
        <td key={`item-subject-name-${item.id}`} className="px-6 py-4">{item.subject.code + '-' + item.subject.name}</td>,
        <td key={`item-instructor-${item.id}`} className="px-6 py-4">{item.instructorCode}</td>,
        <td key={`item-room-${item.id}`} className="px-6 py-4">{item.room.room}</td>,
        <td key={`item-shift-${item.id}`} className="px-6 py-4">{item.shift}</td>,
        <td key={`item-dayOfWeek-${item.id}`} className="px-6 py-4">{item.dayOfWeek}</td>,
        <td key={`item-onlineLink-${item.id}`} className="px-6 py-4">{item.onlineLink}</td>,
        <td key={`item-activityStatus-${item.id}`}
            className={`px-6 py-4 font-bold 
        ${item.activityStatus === "Chưa hoạt động" ? "text-yellow-400" : item.activityStatus === "Đang hoạt động" ? "text-green-400" : "text-red-500"}`}
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
                                className="w-1 h-[2.4rem] text-zinc-400 w-full text-yellow-500"
                                onClick={() => openModal(item, 'Sửa')}
                            >
                                <FontAwesomeIcon icon={faPen} />
                            </Button>
                        </div>
                        <div className="hover:bg-gray-200 rounded-xl">
                            <Button
                                type="button"
                                variant="btn-none"
                                className="w-1 h-[2.4rem] text-zinc-400 w-full text-orange-500"
                                onClick={() => openModal(item, 'Xóa')}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </div>
                    </>
                }
            >
                <Button
                    type="button"
                    variant="btn-none"
                    className="w-1 h-[2.4rem] text-zinc-400"
                    onClick={(event) => handleMouseEnter(item, event)}
                >
                    <FontAwesomeIcon icon={faEllipsis} />
                </Button>
            </Popover>
        </td>,
    ];

    const areas = listAreas.map(area => (
        {
            value: area.id,
            label: area.name
        }));

    // Lấy khu vực theo user
    const userArea = listAreas.filter(area => area.id === (userInfo && userInfo.user ? userInfo.user.area.id : userInfo ? userInfo.area.id : 1));
    const areasOptions = userArea.map(area => (
        {
            value: area.id,
            label: area.name
        }));

    // Thêm giá trị mặc định vào đầu mảng
    areasOptions.unshift({ value: "", label: "Theo khu vực" });

    const specializatonOptions1 = listSpecializaton.map(special => ({
        value: special.code,
        label: special.name
    }));

    const specializatonOptions = listSpecializaton.map(special => ({
        value: special.code,
        label: special.name
    }));
    // Thêm giá trị mặc định vào đầu mảng
    specializatonOptions.unshift({ value: "", label: "Theo bộ môn" });

    const handleAPI = async () => {
        // get specialization
        let responseSpecialization = await getAllSpecializationAPI();
        if (responseSpecialization && responseSpecialization.data) {
            setListSpecializaton(responseSpecialization.data)
        }
        // get areas
        let responseAreas = await getAllAreas();
        if (responseAreas && responseAreas.data) {
            setListAreas(responseAreas.data)
        }

        // GET clazzz
        setIsLoading(true)
        try {
            let response = await getAllClazzAPI();
            console.log(response)
            if (response && response.data) {
                setListClazzAPI(response.data)
                const activeClazz = response.data.filter(item => item.activityStatus === 'Đang hoạt động');
                setListActivityClazz(activeClazz);
                const unActiveClazz = response.data.filter(item => item.activityStatus === 'Chưa hoạt động');
                setListUnActivityClazz(unActiveClazz);
            }
            setIsDataLoaded(true);
        } catch (error) {
            console.log("Lỗi lấy thông tin sinh viên", error)
        } finally {
            setIsLoading(false)
        }

        // get all subjects
        let responseSubjects = await getAllSubjectAPI();
        if (responseSubjects && responseSubjects.data) {
            setListSubject(responseSubjects.data)
        }

        // get all instructor by area
        let responseInstructor = await getAllInstructorByAreaAPI(userInfo ? userInfo.area.id : 1);
        if (responseInstructor && responseInstructor.data) {
            setListInstructor(responseInstructor.data)
        }
    }

    const handleSelectBox = (areaId, semesterId, specializationCode, selectedBlock) => {
        let clazzs = [];

        if (!areaId && !semesterId[0] && !specializationCode && !selectedBlock) {
            clazzs = listClazzAPI
        }
        else if (!areaId && !semesterId[0] && !specializationCode && selectedBlock) {
            clazzs = listClazzAPI.filter(clazz =>
                selectedBlock == clazz.block)
        }
        else if (!areaId && !semesterId[0] && specializationCode && !selectedBlock) {
            clazzs = listClazzAPI.filter(clazz => specializationCode == clazz.subject.specialization.code)
        }
        else if (!areaId && !semesterId[0] && specializationCode && selectedBlock) {
            clazzs = listClazzAPI.filter(clazz => specializationCode == clazz.subject.specialization.code
                && selectedBlock == clazz.block
            )
        }
        else if (!areaId && semesterId[0] && !specializationCode && !selectedBlock) {
            clazzs = listClazzAPI.filter(clazz => semesterId[0] == clazz.semester && semesterId[1] == clazz.year)
        }
        else if (!areaId && semesterId[0] && !specializationCode && selectedBlock) {
            clazzs = listClazzAPI.filter(clazz => semesterId[0] == clazz.semester && semesterId[1] == clazz.year
                && selectedBlock == clazz.block
            )
        }
        else if (!areaId && semesterId[0] && specializationCode && !selectedBlock) {
            clazzs = listClazzAPI.filter(clazz => semesterId[0] == clazz.semester && semesterId[1] == clazz.year
                && specializationCode == clazz.subject.specialization.code
            )
        }
        else if (!areaId && semesterId[0] && specializationCode && selectedBlock) {
            clazzs = listClazzAPI.filter(clazz => semesterId[0] == clazz.semester && semesterId[1] == clazz.year
                && specializationCode == clazz.subject.specialization.code && selectedBlock == clazz.block
            )
        }
        else if (areaId && !semesterId[0] && !specializationCode && !selectedBlock) {
            clazzs = listClazzAPI.filter(clazz => areaId == clazz.room.building.area.id)
        }
        else if (areaId && !semesterId[0] && !specializationCode && selectedBlock) {
            clazzs = listClazzAPI.filter(clazz => areaId == clazz.room.building.area.id
                && selectedBlock == clazz.block
            )
        }
        else if (areaId && !semesterId[0] && specializationCode && !selectedBlock) {
            clazzs = listClazzAPI.filter(clazz => areaId == clazz.room.building.area.id
                && specializationCode == clazz.subject.specialization.code
            )
        }
        else if (areaId && !semesterId[0] && specializationCode && selectedBlock) {
            clazzs = listClazzAPI.filter(clazz => areaId == clazz.room.building.area.id
                && specializationCode == clazz.subject.specialization.code && selectedBlock == clazz.block
            )
        }
        else if (areaId && semesterId[0] && !specializationCode && !selectedBlock) {
            clazzs = listClazzAPI.filter(clazz => areaId == clazz.room.building.area.id
                && semesterId[0] == clazz.semester && semesterId[1] == clazz.year
            )
        }
        else if (areaId && semesterId[0] && !specializationCode && selectedBlock) {
            clazzs = listClazzAPI.filter(clazz => areaId == clazz.room.building.area.id
                && semesterId[0] == clazz.semester && semesterId[1] == clazz.year
                && selectedBlock == clazz.block
            )
        }
        else if (areaId && semesterId[0] && specializationCode && !selectedBlock) {
            clazzs = listClazzAPI.filter(clazz => areaId == clazz.room.building.area.id
                && semesterId[0] == clazz.semester && semesterId[1] == clazz.year
                && specializationCode == clazz.subject.specialization.code
            )
        }
        else if (areaId && semesterId[0] && specializationCode && selectedBlock) {
            clazzs = listClazzAPI.filter(clazz => areaId == clazz.room.building.area.id
                && semesterId[0] == clazz.semester && semesterId[1] == clazz.year
                && specializationCode == clazz.subject.specialization.code
                && selectedBlock == clazz.block
            )
        }
        setListClazz(clazzs)
    }

    const closeModal = () => {
        setIsModalOpenInsert(false);
        setIsModalOpenUpdate(false);
        setIsModalConfirmOpen(false);
        setIsModalOpenExcel(false);
        setIsClazz(null);
        formikClazz.resetForm();
    }

    const openModal = async (item, id) => {
        if (id === 'insert') {
            setIsModalOpenInsert(true);
        }
        else if (id === 'Sửa') {
            setIsClazz(item);
            setIsModalOpenUpdate(true);
        }
        else if (id === 'Xóa') {
            console.log("delete: ", item)
            setIsClazz(item);
            setIsModalConfirmOpen(true);
        }
        else if (id === 'excel') {
            setIsModalOpenExcel(true);
        }
    }

    const formikClazz = useFormik({
        initialValues: {
            id: isClazz ? isClazz.id : 0,
            code: isClazz ? isClazz.code : '',
            onlineLink: isClazz ? isClazz.onlineLink : '',
            quantity: isClazz ? isClazz.quantity : '',
            block: isClazz ? isClazz.block : '',
            semester: isClazz ? isClazz.semester : '',
            year: isClazz ? isClazz.year : '',
            dayOfWeek: isClazz ? isClazz.dayOfWeek : '',
            startTime: isClazz ? isClazz.startTime : '',
            endTime: isClazz ? isClazz.endTime : '',
            status: isClazz ? isClazz.status : true,
            instructorCode: isClazz ? isClazz.instructorCode : '',
            shift: isClazz ? isClazz.shift : '',
            activityStatus: isClazz ? isClazz.activityStatus : 'Chưa hoạt động',
            subject: isClazz ? isClazz.subject.code : '',
            room: isClazz ? isClazz.room.room : '',
            specialization: isClazz ? isClazz.subject.specialization.code : '',
        },
        enableReinitialize: true,
        validationSchema: ClazzSchema,

        onSubmit: async (values, { resetForm }) => {
            const formattedClazz = {
                ...values,
            };

            const action = async () => {
                setLoading(true); // Bắt đầu loading
                if (values.id === 0) {
                    console.log("check, ", formattedClazz)
                    try {
                        const response = await createClazzAPI(formattedClazz);
                        if (response && response.data) {
                            if (response.data.code !== 200)
                                toast.error(response.data.message)
                            if (response.code === 200) {
                                toast.success("Thêm mới lớp học thành công")

                                // Lấy ds clazz mới
                                let responseAllClazz = await getAllClazzAPI();
                                if (responseAllClazz && responseAllClazz.data) {
                                    setListClazzAPI(responseAllClazz.data)
                                    const activeClazz = responseAllClazz.data.filter(item => item.activityStatus === 'Đang hoạt động');
                                    setListActivityClazz(activeClazz);
                                    const unActiveClazz = responseAllClazz.data.filter(item => item.activityStatus === 'Chưa hoạt động');
                                    setListUnActivityClazz(unActiveClazz);
                                }
                                closeModal();
                                resetForm();
                            }
                        }
                    } catch (error) {
                        console.log(error);
                        toast.error("Thêm lớp học không thành công")
                    }
                } else {
                    try {
                        const response = await updateClazzAPI(formattedClazz, values.id);
                        if (response && response.data) {
                            if (response.data.code !== 200)
                                toast.error(response.data.message)
                            if (response.code === 200) {
                                toast.success("Cập nhật lớp học thành công")

                                // Lấy ds clazz mới
                                let responseAllClazz = await getAllClazzAPI();
                                if (responseAllClazz && responseAllClazz.data) {
                                    setListClazzAPI(responseAllClazz.data)
                                    const activeClazz = responseAllClazz.data.filter(item => item.activityStatus === 'Đang hoạt động');
                                    setListActivityClazz(activeClazz);
                                    const unActiveClazz = responseAllClazz.data.filter(item => item.activityStatus === 'Chưa hoạt động');
                                    setListUnActivityClazz(unActiveClazz);
                                }
                                closeModal();
                                resetForm();
                            }
                        }
                    } catch (error) {
                        console.log(error);
                        toast.error("Cập nhật lớp học không thành công")
                    }
                }
                setLoading(false); // Kết thúc loading
                setIsReLoadTable(!isReLoadTable);
            };
            values.id === 0 ? openConfirm(action, "Bạn có chắc muốn thêm lớp học này?")
                : openConfirm(action, "Bạn có chắc muốn cập nhật lớp học này?")
            // toast.success("Đã thêm hoạt động mới")
        },
    });

    const handleDelete = async () => {
        if (isClazz) {
            try {
                let response = await deleteClazzAPI(isClazz.id);
                console.log(response)
                if (response && response.data) {
                    if (response.data.code !== 200)
                        toast.error("Xóa lớp học không thành công")
                }
                else if (response) {
                    if (response.code === 200) {
                        // Lấy ds clazz mới
                        let responseAllClazz = await getAllClazzAPI();
                        if (responseAllClazz && responseAllClazz.data) {
                            setListClazzAPI(responseAllClazz.data)
                            const activeClazz = responseAllClazz.data.filter(item => item.activityStatus === 'Đang hoạt động');
                            setListActivityClazz(activeClazz);
                            const unActiveClazz = responseAllClazz.data.filter(item => item.activityStatus === 'Chưa hoạt động');
                            setListUnActivityClazz(unActiveClazz);
                            setIsReLoadTable(!isReLoadTable);
                        }
                        toast.success("Xóa lớp học thành công")
                    }
                }
                closeModal();
            } catch (error) {
                toast.error("Xóa lớp học không thành công")
            }
        }
    }

    const data = [
        { id: 1, name: 'John Doe', age: 30, profession: 'Developer' },
        { id: 2, name: 'Jane Smith', age: 25, profession: 'Designer' }
    ];

    // Chuyển đổi list sv sang dữ liệu để export excel

    const extractedData = listClazz.map(item => ({
        id: item.id,
        code: item.code,
        onlineLink: item.onlineLink,
        quantity: item.quantity,
        block: item.block,
        semester: item.semester,
        year: item.year,
        dayOfWeek: item.dayOfWeek,
        startTime: item.startTime,
        endTime: item.endTime,
        instructorCode: item.instructorCode,
        shift: item.shift,
        subject: item.subject.code,
        room: item.room.room,
        activityStatus: item.activityStatus,
    }));

    const dataTemplate = [
        {
            code: "DB1001",
            onlineLink: "http://linkmau111",
            quantity: 40,
            block: 1,
            semester: "FALL",
            year: 2024,
            dayOfWeek: "2, 4, 6",
            startTime: "2024-09-08",
            endTime: "2024-11-22",
            instructorCode: "tiennn1",
            shift: 3,
            subject: "COM2012",
            room: "ONLINE",
        },
        {
            code: "WEB3021",
            onlineLink: "",
            quantity: 40,
            block: 2,
            semester: "SUMMER",
            year: 2024,
            dayOfWeek: "3, 5, 7",
            startTime: "2024-11-03",
            endTime: "2024-12-20",
            instructorCode: "có hoặc không",
            shift: 1,
            subject: "WEB207",
            room: "F202",
        }
    ];

    useEffect(() => {
        handleAPI();
    }, [])

    useEffect(() => {
        let date = new Date();
        let currentYear = date.getFullYear();
        let currentMonth = date.getMonth() + 1;
        let currentSemesterValue: string;

        // lấy học kỳ hiện tại
        if (1 <= currentMonth && currentMonth < 5) {
            currentSemesterValue = "SPRING " + currentYear;
        }
        else if (5 <= currentMonth && currentMonth < 9)
            currentSemesterValue = "SUMMER " + currentYear;
        else
            currentSemesterValue = "FALL " + currentYear;

        if (selectedSemester[0] == '0')
            setSelectedSemester(currentSemesterValue.split(' '))

        if (isDataLoaded && selectedArea === "0" && userInfo) {
            handleSelectBox(userInfo && userInfo.user ? userInfo.user.area.id : userInfo ? userInfo.area.id : "", selectedSemester, selectedSpecialization, selectedBlock);
        }
        else if (isDataLoaded) {
            handleSelectBox(selectedArea, selectedSemester, selectedSpecialization, selectedBlock)
        }
    }, [selectedArea, isDataLoaded, selectedSemester, selectedSpecialization, selectedBlock, userInfo, isReLoadTable]);

    return (
        <Container>
            <TitleHeader title="QUẢN LÝ LỚP HỌC" />
            <div className="w-full flex flex-wrap md:flex-nowrap py-3 gap-3">
                <CardBox icon={faSchoolFlag} title="Tổng số lớp học" count={listClazzAPI.length} />
                <CardBox icon={faSchoolCircleCheck} title="Đang hoạt động" count={listActivityClazz.length} />
                <CardBox icon={faSchoolLock} title="Chưa hoạt động" count={listUnActivityClazz.length} />
            </div>

            <div className="w-full bg-white p-4 shadow-md rounded-2xl">
                <div>
                    {/* <p className="text-[#9A9A9A] text-xs self-center mr-3 pb-2">Số lượng: <strong>30</strong></p> */}
                    <div className="flex flex-wrap gap-2">
                        <div className="columns-1">
                            <SelectBox
                                id="areas"
                                name="areas"
                                disableDefaultOption={true}
                                disable={true}
                                options={areasOptions}
                                defaultValue={userInfo && userInfo.user ? userInfo.user.area.id : userInfo ? userInfo.area.id : ""}
                                onChange={event => setSelectedArea(event.target.value)}
                            />
                        </div>
                        <div className="columns-1">
                            <Semesters
                                onChange={event => setSelectedSemester(event.target.value.split(' '))}
                            />
                        </div>
                        <div className="columns-1">
                            <SelectBox
                                id="blocks"
                                name="blocks"
                                disableDefaultOption={true}
                                options={[
                                    { value: '', label: "Theo block" },
                                    { value: 1, label: "Block 1" },
                                    { value: 2, label: "Block 2" }
                                ]}
                                onChange={event => setSelectedBlock(event.target.value)}
                            />
                        </div>

                        <div className="columns-1">
                            <SelectBox
                                id="specialization"
                                name="specialization"
                                disableDefaultOption={true}
                                options={specializatonOptions}
                                onChange={event => setSelectedSpecialization(event.target.value)}
                            />
                        </div>
                        <div className="columns-1">
                            <Button className="flex items-center border shadow-md rounded-lg text-gray-600 hover:bg-gray-100" variant="btn-none"
                                onClick={() => openModal('', 'excel')}
                            >
                                <FontAwesomeIcon icon={faFile} className="mr-2  text-gray-600" />
                                <span className="text-gray-600">Nhập/Xuất Excel</span>
                            </Button>
                        </div>
                        <div className="columns-1">
                            <Button
                                type="button"
                                size="xs"
                                variant="btn-none"
                                className="bg-blue-500 p-2 w-full md:w-40 self-center"
                                onClick={() => openModal('', 'insert')}
                            >
                                <FontAwesomeIcon icon={faPlus} /> Thêm lớp học
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 overflow-x-auto">
                    <Tables
                        headers={["Mã Lớp", "Môn Học", "Giảng Viên", "Phòng", "Ca học", "Ngày Học", "Link Online", "Trạng thái", ""]}
                        renderRow={renderRow}
                        data={clazzs}
                        advanced={true}
                        optionsValue={[
                            { value: '', label: 'Tất cả' },
                            { value: 'Chưa hoạt động', label: 'Chưa hoạt động' },
                            { value: 'Đang hoạt động', label: 'Đang hoạt động' },
                            { value: 'Chưa hoạt động', label: 'Chưa hoạt động' }
                        ]}
                        loading={isLoading}
                        advancedRowFilter
                    />

                    {/* Thêm mới clazz */}
                    <Modal id={"CourseRegistraionModal"}
                        width="w-full md:max-w-6xl h-auto"
                        title={`Thêm mới lớp học`}
                        content={
                            <ClazzModal
                                formik={formikClazz}
                                areaOption={areas}
                                specializatonOptions={specializatonOptions1}
                                hidden={true}
                                listSubject={listSubject}
                                listInstructor={listInstructor}
                            />
                        }
                        positionButton="end"
                        isOpen={isModalOpenInsert}
                        onClose={closeModal}
                        type="message"
                        buttonCancel={
                            <Button
                                onClick={() => formikClazz.resetForm()}
                                hiddenParent="addActivity" variant="btn-secondary" type="button">
                                Reset
                            </Button>
                        }
                        buttonConfirm={<Button
                            onClick={() => formikClazz.submitForm()}
                            variant="btn-primary"
                            icon={!loading &&
                                <FontAwesomeIcon icon={faPlus} />}
                            size="text-sm w-20"
                        >
                            {loading ? (
                                <>
                                    <Spinner className="text-white" />
                                </>
                            ) : "Lưu"
                            }
                        </Button>}
                    >
                    </Modal>

                    {/* Cập nhật sinh viên */}
                    <Modal id={"CourseRegistraionModal"}
                        width="w-full md:max-w-6xl h-auto"
                        title={`Cập nhật lớp học`}
                        content={
                            <ClazzModal
                                formik={formikClazz}
                                disable={true}
                                areaOption={areas}
                                validateSemester={true}
                                specializatonOptions={specializatonOptions1}
                                listSubject={listSubject}
                                listInstructor={listInstructor}
                            />
                        }
                        positionButton="end"
                        isOpen={isModalOpenUpdate}
                        onClose={closeModal}
                        type="message"
                        buttonConfirm={
                            <Button
                                onClick={() => formikClazz.submitForm()}
                                variant="btn-primary"
                                icon={!loading &&
                                    <FontAwesomeIcon icon={faPlus} />}
                                size="text-sm w-20"
                                className='p-3'
                            >
                                {loading ? (
                                    <>
                                        <Spinner className="text-white" />
                                    </>
                                ) : "Lưu"
                                }

                            </Button>}
                    >
                    </Modal>

                    {/* Xóa sinh viên */}
                    <Modal id={"denyConfirmModal"}
                        width="max-w-xl"
                        title={"Bạn muốn xóa sinh viên này?"}
                        content={<></>}
                        iconPopup={<FontAwesomeIcon icon={faCircleExclamation} className="text-yellow-600 w-24 h-24" />}
                        positionButton="center"
                        buttonCancel={<Button onClick={closeModal} hiddenParent="demoDate" variant="btn-secondary" type="button" size="text-sm px-6 py-3">Hủy</Button>}
                        buttonConfirm={
                            <Button
                                variant="btn-primary" type="button" size="text-sm px-6 py-3"
                                onClick={handleDelete}
                            >
                                Xác Nhận
                            </Button>
                        }
                        isOpen={isModalOpenConfirm}
                        onClose={closeModal}
                        type="message"
                    >
                    </Modal>
                    <Modal
                        id="importExcel"
                        title="Làm việc với excel"
                        content={
                            <UploadExcelModal
                                onClose={closeModal}
                                dataExport={extractedData}
                                setListAPI={setListClazzAPI}
                                setList={setListClazz}
                                setListActivity={setListActivityClazz}
                                setListUnActivity={setListUnActivityClazz}
                                setIsReLoadTable={setIsReLoadTable}
                                isReLoadTable={isReLoadTable}
                                dataTemplate={dataTemplate}
                                exportFileName="Danh sách lớp học"
                                exportFileNamePattern="Danh sách lớp học mẫu để import"
                                sheetName='DSLH'
                                getAllObject={getAllClazzAPI}
                                importExcelAPI={importExcelClazzAPI}
                            />
                        }
                        isOpen={isModalOpenExcel}
                        onClose={closeModal}
                    />
                    <ModalConfirm
                        isOpen={isConfirmOpen}
                        onClose={closeConfirm}
                        onConfirm={confirmAction}
                        question={confirmQuestion}
                    />
                </div>

            </div>
        </Container>
    );
}

export default ClazzManagementPage;