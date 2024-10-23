import React, { useState, useEffect } from "react";
import TitleHeader from "../../components/TitleHeader.tsx";
import Button from "../../components/Button.tsx";
import SelectBox from "../../components/SelectBox.tsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Tables from "../../components/tables/Tables.tsx";
import CardBox from "../../components/CartBox.tsx";
import { faEllipsis, faFile, faPlus, faPen, faUserCheck, faUserGroup, faUserXmark, faTrash, faCircleExclamation, faSchoolFlag, faSchoolCircleCheck, faSchoolLock } from '@fortawesome/free-solid-svg-icons';
import { getAllClazzAPI } from "../../services/ClazzService.js";
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

interface Subject {
    id: number;
    code: string;
    name: string;
    specialization: Specialization;
}

interface Specialization {
    code: string;
    name: string;
}

interface Room {
    id: number;
    room: string;
}

interface Clazz {
    id: number;
    code: string;
    onlineLink: string;
    quantity: number;
    block: number;
    semester: string;
    year: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    status: boolean;
    instructorCode: string;
    shift: string;
    activityStatus: string;
    subject: Subject;
    room: Room;
}

interface Area {
    id: string;
    name: string;
}

interface EducationProgram {
    code: string;
    name: string;
}

// interface TypeClazz {
//     id: number,
//     enterSchool: string;
//     semester: string;
//     education_program: string;
//     year: string;
//     user: {
//         code: string;
//         lastName: string;
//         firstName: string;
//         email: string;
//         password: string;
//         gender: string;
//         birthday: string;
//         phone: string;
//         address: string;
//         description: string;
//         area: string;
//         avatar: string;
//         status: boolean;
//     }
// }


const ClazzManagementPage = () => {
    const [listClazz, setListClazz] = useState([]);
    const [listClazzAPI, setListClazzAPI] = useState([]);
    const [listAreas, setListAreas] = useState<Area[]>([]);
    const [listSpecializaton, setListSpecializaton] = useState<Specialization[]>([]);
    const [listActivityClazz, setListActivityClazz] = useState([]);
    const [listUnActivityClazz, setListUnActivityClazz] = useState([]);
    const [listEducationProgram, setListEducationProgram] = useState<EducationProgram[]>([]);
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
    const [publicId, setPublicId] = useState("");
    const [loading, setLoading] = useState(false);

    const clazzs: Clazz[] = listClazz.length > 0 ? listClazz : listClazz;

    const renderRow = (item: Clazz) => [
        // <th key={`item-id-${item.id}`} className="px-6 py-4">{item.id}</th>,
        <td key={`item-clazz-code-${item.id}`} className="px-6 py-4">{item.code}</td>,
        <td key={`item-subject-name-${item.id}`} className="px-6 py-4">{item.subject.code + '-' + item.subject.name}</td>,
        <td key={`item-instructor-${item.id}`} className="px-6 py-4">{item.instructorCode}</td>,
        <td key={`item-room-${item.id}`} className="px-6 py-4">{item.room.room}</td>,
        <td key={`item-shift-${item.id}`} className="px-6 py-4">{item.shift}</td>,
        <td key={`item-dayOfWeek-${item.id}`} className="px-6 py-4">{item.dayOfWeek}</td>,
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
                                className="w-1 h-[2.4rem] text-zinc-400 w-full text-yellow-400"
                                onClick={() => openModal(item, 'Sửa')}
                            >
                                <FontAwesomeIcon icon={faPen} />
                            </Button>
                        </div>
                        <div className="hover:bg-gray-200 rounded-xl">
                            <Button
                                type="button"
                                variant="btn-none"
                                className="w-1 h-[2.4rem] text-zinc-400 w-full text-orange-400"
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

    const areasOptions = listAreas.map(area => (
        {
            value: area.id,
            label: area.name
        }));

    // Thêm giá trị mặc định vào đầu mảng
    areasOptions.unshift({ value: "", label: "Theo khu vực" });

    const specializatonOptions = listSpecializaton.map(special => ({
        value: special.code,
        label: special.name
    }));
    // Thêm giá trị mặc định vào đầu mảng
    specializatonOptions.unshift({ value: "", label: "Theo bộ môn" });

    const educationProgramOptions = listEducationProgram.map(area => (
        {
            value: area.code,
            label: area.name
        }));

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

        // get education programs
        let responseEducationPrograms = await getAllEducationProgramAPI();
        if (responseEducationPrograms && responseEducationPrograms.data) {
            setListEducationProgram(responseEducationPrograms.data)
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
                const unActiveClazz = response.data.filter(item => item.activityStatus === 'Ngừng hoạt động');
                setListUnActivityClazz(unActiveClazz);

                // load dssv theo khu vực của admin
                // if (userInfo && userInfo.user) {
                //     let userAreaId = userInfo.user.area.id
                //     let clazzs = response.data.filter(clazz => userAreaId == clazz.user.area.id)
                //     setListClazz(clazzs)
                // }
                // else if (userInfo) {
                //     let userAreaId = userInfo.area.id
                //     let clazzs = response.data.filter(clazz => userAreaId == clazz.user.area.id)
                //     setListClazz(clazzs)
                // }
            }
            setIsDataLoaded(true);
        } catch (error) {
            console.log("Lỗi lấy thông tin sinh viên", error)
        } finally {
            setIsLoading(false)
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
            setPublicId(getPublicIdFromUrl(item.user.avatar))
        }
        else if (id === 'Xóa') {
            setIsClazz(item);
            setIsModalConfirmOpen(true);
        }
        else if (id === 'excel') {
            setIsModalOpenExcel(true);
        }
    }

    // Lấy public id từ url
    function getPublicIdFromUrl(url) {
        // Tách URL thành các phần theo dấu "/"
        const parts = url.split('/');

        // Public ID nằm ngay trước phần định dạng của file (ví dụ: .jpg, .png)
        const publicIdWithExtension = parts[parts.length - 1];

        // Tách public ID từ phần đuôi mở rộng (bỏ phần .jpg, .png...)
        const publicId = publicIdWithExtension.split('.')[0];

        return publicId;
    }

    const formikClazz = useFormik({
        initialValues: {
            id: isClazz ? isClazz.id : 0,
            code: isClazz ? isClazz.code : '',
            onlineLink: isClazz ? isClazz.onlineLink : '',
            quantity: isClazz ? isClazz.quantity : '',
            block: isClazz ? isClazz.block : 1,
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

            // id: isClazz ? isClazz.id : 0,
            // enterSchool: isClazz ? isClazz.enterSchool : '',
            // semester: isClazz ? isClazz.semester : '',
            // education_program: isClazz ? isClazz.education_program.code : '',
            // year: isClazz ? isClazz.year : '',
            // user: {
            //     code: isClazz ? isClazz.user.code : '',
            //     lastName: isClazz ? isClazz.user.lastName : '',
            //     firstName: isClazz ? isClazz.user.firstName : '',
            //     email: isClazz ? isClazz.user.email : '',
            //     password: isClazz ? '12345' : '',
            //     gender: isClazz ? isClazz.user.gender : '',
            //     birthday: isClazz ? isClazz.user.birthday : '',
            //     phone: isClazz ? isClazz.user.phone : '',
            //     address: isClazz ? isClazz.user.address : '',
            //     description: isClazz ? isClazz.user.description : '',
            //     area: isClazz ? isClazz.user.area.id : '',
            //     avatar: isClazz ? isClazz.user.avatar : '',
            //     status: isClazz ? isClazz.user.status : true,
            // },
        },
        enableReinitialize: true,
        validationSchema: ClazzSchema,

        onSubmit: async (values, { resetForm }) => {
            // const formattedClazz: TypeClazz = {
            //     ...values,
            //     user: {
            //         ...values.user,
            //     },
            // };

            // Tạo FormData
            const formData = new FormData();

            // Tạo bản sao user với avatar là chuỗi rỗng
            const userWithoutAvatar = {
                ...values.user,
                avatar: '', // Thiết lập avatar thành chuỗi rỗng
            };

            // Chuyển object clazz thành JSON và thêm vào FormData
            const clazzJson = JSON.stringify({
                ...values,
                user: userWithoutAvatar,
            });
            formData.append('clazz', clazzJson);

            // Thêm file ảnh vào FormData nếu có
            if (values.user.avatar) {
                if (typeof values.user.avatar === 'string') {
                    formData.append('avatar', "");
                }
                else
                    formData.append('avatar', values.user.avatar);
            }
            else {
                formData.append('avatar', "");
            }

            const action = async () => {
                setLoading(true); // Bắt đầu loading
                if (values.id === 0) {
                    try {
                        const response = await createClazzAPI(formData);
                        if (response && response.data) {
                            if (response.data.code !== 200)
                                toast.error(response.data.message)
                            if (response.code === 200) {
                                toast.success("Thêm mới sinh viên thành công")

                                let responseAllClazzs = await getAllClazzs();
                                setListClazzAPI(responseAllClazzs.data)
                                setListClazz(responseAllClazzs.data)
                                const activeClazzs = responseAllClazzs.data.filter(item => item.user.status);
                                setListActivityClazz(activeClazzs);
                            }
                        }
                    } catch (error) {
                        console.log(error);
                        toast.error("Thêm sinh viên không thành công")
                    }
                } else {
                    formData.append('publicId', publicId);
                    try {
                        await updateClazzAPI(values.id, formData);
                        let responseAllClazzs = await getAllClazzs();
                        setListClazzAPI(responseAllClazzs.data)
                        setListClazz(responseAllClazzs.data)
                        const activeClazzs = responseAllClazzs.data.filter(item => item.user.status);
                        setListActivityClazz(activeClazzs);
                        toast.success("Cập nhật sinh viên thành công")
                    } catch (error) {
                        toast.error("Cập nhật sinh viên không thành công")
                    }
                }
                setLoading(false); // Kết thúc loading
                closeModal();
                resetForm();
                setIsReLoadTable(!isReLoadTable);
            };
            values.id === 0 ? openConfirm(action, "Bạn có chắc muốn thêm sinh viên này?")
                : openConfirm(action, "Bạn có chắc muốn cập nhật sinh viên này?")
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
                        toast.error("Xóa không thành công, sinh viên này đã đăng ký lớp học")
                }
                else if (response) {
                    if (response.code === 200) {
                        let responseAllClazzs = await getAllClazzs();

                        setListClazzAPI(responseAllClazzs.data)
                        setListClazz(responseAllClazzs.data)
                        const activeClazzs = responseAllClazzs.data.filter(item => item.user.status);
                        setListActivityClazz(activeClazzs);
                        setIsReLoadTable(!isReLoadTable);
                        toast.success("Xóa sinh viên thành công")
                    }
                }
                closeModal();
            } catch (error) {
                toast.error("Xóa sinh viên không thành công")
            }
        }
    }

    const data = [
        { id: 1, name: 'John Doe', age: 30, profession: 'Developer' },
        { id: 2, name: 'Jane Smith', age: 25, profession: 'Designer' }
    ];

    // Chuyển đổi list sv sang dữ liệu để export excel

    // const extractedData = listClazz.map(item => ({
    //     id: item.id,
    //     education_program: item.education_program.code, // Lấy mã chương trình học
    //     enterSchool: item.enterSchool,
    //     semester: item.semester,
    //     year: item.year,
    //     major: item.education_program.major.code,

    //     code: item.user.code,
    //     lastName: item.user.lastName,
    //     firstName: item.user.firstName,
    //     email: item.user.email,
    //     gender: item.user.gender,
    //     phone: item.user.phone,
    //     birthday: item.user.birthday,
    //     address: item.user.address,
    //     area: item.user.area.name,
    // }));

    const dataTemplate = [
        {
            education_program: "QTKD",
            enterSchool: "2024-10-17",
            semester: "FALL",
            year: 2024,
            major: "LOGISTICS",
            area: "1",
            code: "PS24050",
            lastName: "Trần Văn",
            firstName: "Hoàng",
            email: "nguyenvana11@example.com",
            password: "12345",
            gender: 1,
            phone: "0937583721",
            birthday: "2000-10-10",
            address: "Bình Định",
        },
        {
            education_program: "QTKD",
            enterSchool: "2024-10-31",
            semester: "FALL",
            year: 2024,
            major: "LOGISTICS",
            area: "2",
            code: "PS28138",
            lastName: "Nguyễn",
            firstName: "Nghĩa",
            email: "nghia123@gmail.com",
            password: "12345",
            gender: 1,
            phone: "0969773217",
            birthday: "2000-10-04",
            address: "Bình Định",
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
                <CardBox icon={faSchoolLock} title="Ngừng hoạt động" count={listUnActivityClazz.length} />
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
                        headers={["Mã Lớp", "Môn Học", "Giảng Viên", "Phòng", "Ca học", "Ngày Học", "Trạng thái", ""]}
                        renderRow={renderRow}
                        data={clazzs}
                        advanced={true}
                        optionsValue={[
                            { value: '', label: 'Tất cả' },
                            { value: 'Chưa hoạt động', label: 'Chưa hoạt động' },
                            { value: 'Đang hoạt động', label: 'Đang hoạt động' },
                            { value: 'Ngừng hoạt động', label: 'Ngừng hoạt động' }
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
                                educationProgramOption={educationProgramOptions}
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
                    {/* <Modal id={"CourseRegistraionModal"}
                        width="w-full md:max-w-6xl h-auto"
                        title={`Cập nhật sinh viên`}
                        content={
                            <ClazzModal formik={formikClazz}
                                disable={true}
                                hidden={true}
                                areaOption={areas}
                                educationProgramOption={educationProgramOptions}
                                validateSemester={true}
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
                    </Modal> */}

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
                            // onClick={handleDelete}
                            >
                                Xác Nhận
                            </Button>
                        }
                        isOpen={isModalOpenConfirm}
                        onClose={closeModal}
                        type="message"
                    >
                    </Modal>
                    {/* <Modal
                        id="importExcel"
                        title="Làm việc với excel"
                        content={
                            <UploadExcelModal
                                onClose={closeModal}
                                dataExport={extractedData}
                                setListClazzAPI={setListClazzAPI}
                                setListClazz={setListClazz}
                                setListActivityClazz={setListActivityClazz}
                                setIsReLoadTable={setIsReLoadTable}
                                isReLoadTable={isReLoadTable}
                                dataTemplate={dataTemplate}
                                exportFileName="Danh sách sinh viên"
                                exportFileNamePattern="Danh sách sinh viên mẫu để import"
                                sheetName='DSSV'
                            />
                        }
                        isOpen={isModalOpenExcel}
                        onClose={closeModal}
                    /> */}
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