import React, { useState, useEffect } from "react";
import TitleHeader from "../../../components/TitleHeader.tsx";
import Button from "../../../components/Button.tsx";
import SelectBox from "../../../components/SelectBox.tsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Tables from "../../../components/tables/Tables.tsx";
import CardBox from "../../../components/CartBox.tsx";
import { faEllipsis, faFile, faFileExport, faPlus, faPen, faUserCheck, faUserGroup, faUserXmark, faTrash, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { getAllStudents, createStudentAPI } from "../../../services/StudentService.js";
import { getAllAreas } from "../../../services/areaService.js";
import { getAllMajors } from "../../../services/majorService.js";
import useHoverModal from "../../../hooks/useHoverModal.ts";
import Popover from "../../../components/Popover.tsx";
import Container from "../../../components/Container.tsx"
import { useSelector } from 'react-redux';
import { Semesters } from '../../../utilss/semestersUtils.tsx'
import Modal from "../../../components/Modal.tsx";
import { StudentModal } from "./StudentModal.tsx";
import { useFormik } from 'formik';
import { StudentSchema } from './StudentModal.tsx'
import ModalConfirm from '../../../components/ModalConfirm.tsx'
import useConfirm from "../../../hooks/useConfirm";
import { toast } from 'react-toastify';
import { getAllEducationProgramAPI } from '../../../services/educationProgramService.js'

interface User {
    id: number;
    code: string;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    gender: number;
    birthday: string;
    phone: string;
    address: string;
    description: string;
    area: number;
    avatar: string;
    status: boolean;
}

interface Student {
    id: number;
    enterSchool: string;
    semester: string;
    year: number;
    user: User;
}

interface Area {
    id: string;
    name: string;
}

interface Major {
    id: string;
    name: string;
}

interface EducationProgram {
    code: string;
    name: string;
}

interface TypeStudent {
    id: number,
    enterSchool: string;
    semester: string;
    education_program: string;
    year: string;
    user: {
        code: string;
        lastName: string;
        firstName: string;
        email: string;
        password: string;
        gender: string;
        birthday: string;
        phone: string;
        address: string;
        description: string;
        area: string;
        avatar: string;
        status: boolean;
    }
}


const StudentManagePage = () => {
    const [listStudent, setListStudent] = useState([]);
    const [listStudentAPI, setListStudentAPI] = useState([]);
    const [listAreas, setListAreas] = useState<Area[]>([]);
    const [listMajors, setListMajors] = useState<Major[]>([]);
    const [listActivityStudent, setListActivityStudent] = useState([]);
    const [listEducationProgram, setListEducationProgram] = useState<EducationProgram[]>([]);
    const getPosition = (rect: DOMRect) => ({ top: rect.top + window.scrollY - 10, left: rect.left + rect.width - 200 });
    const { handleMouseEnter, targetValue } = useHoverModal(getPosition);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const userInfo = useSelector((state) => state.user.userInfo);
    const [selectedArea, setSelectedArea] = useState(userInfo && userInfo.user ? userInfo.user.area.id : userInfo ? userInfo.area.id : "0"); // Giá trị mặc định
    const [selectedSemester, setSelectedSemester] = useState(['0']);
    const [selectedMajor, setSelectedMajor] = useState('');
    const [isModalOpenInsert, setIsModalOpenInsert] = useState(false);
    const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
    const [isModalOpenConfirm, setIsModalConfirmOpen] = useState(false);
    const { isConfirmOpen, openConfirm, closeConfirm, confirmAction, confirmQuestion } = useConfirm();

    const students: Student[] = listStudent.length > 0 ? listStudent : listStudent;

    const renderRow = (item: Student) => [
        // <th key={`item-id-${item.id}`} className="px-6 py-4">{item.id}</th>,
        <td key={`item-code-${item.id}`} className="px-6 py-4">{item.user.code}</td>,
        <td key={`item-name-${item.id}`} className="px-6 py-4">{item.user.lastName + ' ' + item.user.firstName}</td>,
        <td key={`item-gender-${item.id}`} className="px-6 py-4">{item.user.gender ? "Nam" : "Nữ"}</td>,
        <td key={`item-birthday-${item.id}`} className="px-6 py-4">{item.user.birthday}</td>,
        <td key={`item-status-${item.id}`} className={`px-6 py-4 font-bold ${item.user.status ? "text-green-400" : "text-red-500"}`}>
            {item.user.status ? "Đang học" : "Đã tốt nghiệp"}</td>,
        <td key={`item-${item.id}`} className="px-6 py-4 text-center">

            <Popover
                content={
                    <>
                        <div className="hover:bg-gray-200 rounded-xl">
                            <Button
                                type="button"
                                variant="btn-none"
                                className="w-1 h-[2.4rem] text-zinc-400 w-full text-yellow-500"
                                onClick={(event) => openModal(item, 'Sửa')}
                            >
                                <FontAwesomeIcon icon={faPen} />
                            </Button>
                        </div>
                        <div className="hover:bg-gray-200 rounded-xl">
                            <Button
                                type="button"
                                variant="btn-none"
                                className="w-1 h-[2.4rem] text-zinc-400 w-full text-orange-500"
                                onClick={(event) => openModal(item, 'Xóa')}
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

    const majorOptions = listMajors.map(major => ({
        value: major.id,
        label: major.name
    }));
    // Thêm giá trị mặc định vào đầu mảng
    majorOptions.unshift({ value: "", label: "Theo ngành học" });

    const educationProgramOptions = listEducationProgram.map(area => (
        {
            value: area.code,
            label: area.name
        }));

    const handleAPI = async () => {
        // get majors
        let responseMajors = await getAllMajors();
        if (responseMajors && responseMajors.data) {
            setListMajors(responseMajors.data)
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

        // GET STUDENT
        setIsLoading(true)
        try {
            let response = await getAllStudents();
            if (response && response.data) {
                setListStudentAPI(response.data)
                const activeStudents = response.data.filter(item => item.user.status);
                setListActivityStudent(activeStudents);

                // load dssv theo khu vực của admin
                if (userInfo && userInfo.user) {
                    let userAreaId = userInfo.user.area.id
                    let students = response.data.filter(student => userAreaId == student.user.area.id)
                    setListStudent(students)
                }
                else if (userInfo) {
                    let userAreaId = userInfo.area.id
                    let students = response.data.filter(student => userAreaId == student.user.area.id)
                    setListStudent(students)
                }
            }
            setIsDataLoaded(true);
        } catch (error) {
            console.log("Lỗi lấy thông tin sinh viên", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSelectBox = (areaId, semesterId, majorId) => {
        let students = [];

        if (areaId === '' && semesterId[0] === '' && majorId === '') {
            students = listStudentAPI
        }
        else if (areaId === '' && semesterId[0] !== '' && majorId === '') {
            students = listStudentAPI.filter(student => semesterId[0] == student.semester && semesterId[1] == student.year)
        }
        else if (areaId !== '' && semesterId[0] === '' && majorId === '') {
            students = listStudentAPI.filter(student => areaId == student.user.area.id)
        }
        else if (areaId !== '' && semesterId[0] !== '' && majorId === '') {
            students = listStudentAPI.filter(student => areaId == student.user.area.id
                && semesterId[0] == student.semester && semesterId[1] == student.year)
        }
        else if (areaId !== '' && semesterId[0] === '' && majorId !== '') {
            students = listStudentAPI.filter(student => areaId == student.user.area.id &&
                majorId == student.education_program.major.id
            )
        }
        else if (areaId === '' && semesterId[0] !== '' && majorId !== '') {
            students = listStudentAPI.filter(student => semesterId[0] == student.semester && semesterId[1] == student.year
                && majorId == student.education_program.major.id
            )
        }
        else if (areaId === '' && semesterId[0] === '' && majorId !== '') {
            students = listStudentAPI.filter(student => majorId == student.education_program.major.id)
        }
        else {
            students = listStudentAPI.filter(student => areaId == student.user.area.id
                && semesterId[0] == student.semester && semesterId[1] == student.year
                && majorId == student.education_program.major.id)
        }
        setListStudent(students)
    }

    const closeModal = () => {
        setIsModalOpenInsert(false);
        setIsModalOpenUpdate(false);
        setIsModalConfirmOpen(false);
    }

    const openModal = async (item, id) => {
        if (id === 'insert') {
            setIsModalOpenInsert(true);
        }
        else if (id === 'Sửa') {
            setIsModalOpenUpdate(true);
        }
        else if (id === 'Xóa') {
            setIsModalConfirmOpen(true);
        }
    }

    const formikStudent = useFormik({
        initialValues: {
            id: 0,
            enterSchool: '',
            semester: '',
            education_program: '',
            year: '',
            user: {
                code: '',
                lastName: '',
                firstName: '',
                email: '',
                password: '',
                gender: '',
                birthday: '',
                phone: '',
                address: '',
                description: '',
                area: '',
                avatar: '',
                status: true,
            },
        },
        validationSchema: StudentSchema,

        onSubmit: async (values, { resetForm }) => {
            const formattedStudent: TypeStudent = {
                ...values,
                user: {
                    ...values.user,
                    // birthday: formattedSelectedDate(new Date(values.user.birthday))
                },
                // enterSchool: formattedSelectedDate(new Date(values.enterSchool))
            };
            console.log(values.id)
            const action = async () => {
                if (values.id === 0) {
                    try {
                        console.log("data: ", formattedStudent);
                        const response = await createStudentAPI(formattedStudent);
                        console.log(response);
                        if (response && response.data) {
                            if (response.data.code !== 200)
                                toast.error(response.data.message)
                            if (response.code === 200)
                                toast.success("Thêm mới sinh viên thành công")

                            let responseAllStudents = await getAllStudents();
                            setListStudentAPI(responseAllStudents.data)
                            setListStudent(responseAllStudents.data)
                            const activeStudents = responseAllStudents.data.filter(item => item.user.status);
                            setListActivityStudent(activeStudents);
                        }
                    } catch (error) {
                        console.log(error);
                        toast.error("Thêm sinh viên không thành công")
                    }
                } else {
                    // try {
                    //     await handleUpdateActivity(formattedStudent);
                    //     toast.success("Cập nhật hoạt động thành công")
                    // } catch (error) {
                    //     toast.error("Cập nhật hoạt động không thàn công")
                    // }

                }

                closeModal();
                resetForm();
            };
            openConfirm(action, "Bạn có chắc muốn thêm sinh viên này?");
            // toast.success("Đã thêm hoạt động mới")
        },
    });

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
            handleSelectBox(userInfo && userInfo.user ? userInfo.user.area.id : userInfo ? userInfo.area.id : "", selectedSemester, selectedMajor);
        }
        else if (isDataLoaded) {
            handleSelectBox(selectedArea, selectedSemester, selectedMajor)
        }
    }, [selectedArea, isDataLoaded, selectedSemester, selectedMajor, userInfo]);

    return (
        <Container>
            <TitleHeader title="QUẢN LÝ SINH VIÊN" />
            <div className="w-full flex flex-wrap md:flex-nowrap py-3 gap-3">
                <CardBox icon={faUserGroup} title="Tổng số sinh viên" count={listStudentAPI.length} />
                <CardBox icon={faUserCheck} title="Đang học" count={listActivityStudent.length} />
                <CardBox icon={faUserXmark} title="Đã tốt nghiệp" count={listStudentAPI.length - listActivityStudent.length} />
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
                                id="majors"
                                name="majors"
                                disableDefaultOption={true}
                                options={majorOptions}
                                onChange={event => setSelectedMajor(event.target.value)}
                            />
                        </div>
                        <div className="columns-1">
                            <Button
                                type="button"
                                variant="btn-none"
                                className="bg-gray-300 p-2 w-full md:w-40 self-center"
                            >
                                <FontAwesomeIcon icon={faFile} /> Import file excel
                            </Button>
                        </div>
                        <div className="columns-1">
                            <Button
                                type="button"
                                size="xs"
                                variant="btn-none"
                                className="bg-gray-300 p-2 w-full md:w-40 self-center"
                            >
                                <FontAwesomeIcon icon={faFileExport} /> Export file excel
                            </Button>
                        </div>
                        <div className="columns-1">
                            <Button
                                type="button"
                                size="xs"
                                variant="btn-none"
                                className="bg-blue-500 p-2 w-full md:w-40 self-center"
                                onClick={(event) => openModal('', 'insert')}
                            >
                                <FontAwesomeIcon icon={faPlus} /> Thêm sinh viên
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 overflow-x-auto">
                    <Tables
                        headers={["Mã Sinh Viên", "Họ Và Tên", "Giới tính", "Ngày sinh", "Trạng thái", ""]}
                        renderRow={renderRow}
                        data={students}
                        advanced={true}
                        optionsValue={[
                            { value: '', label: 'Tất cả' },
                            { value: true, label: 'Đang học' },
                            { value: false, label: 'Đã tốt nghiệp' }
                        ]}
                        maxRow={5}
                        loading={isLoading}
                        advancedRowFilter
                    />
                    <Modal id={"CourseRegistraionModal"}
                        width="w-full md:max-w-6xl h-auto"
                        title={`Thêm mới sinh viên`}
                        content={
                            <StudentModal
                                formik={formikStudent}
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
                                onClick={() => formikStudent.resetForm()}
                                hiddenParent="addActivity" variant="btn-secondary" type="button">
                                Reset
                            </Button>
                        }
                        buttonConfirm={<Button
                            onClick={() => formikStudent.submitForm()}
                            variant="btn-primary"
                            icon={<FontAwesomeIcon icon={faPlus} />}
                            size="text-sm w-20"
                        >
                            Lưu
                        </Button>}
                    >
                    </Modal>
                    <Modal id={"CourseRegistraionModal"}
                        width="w-full md:max-w-6xl h-full"
                        title={`Cập nhật sinh viên`}
                        content={
                            <StudentModal formik={formikStudent} />
                        }
                        positionButton="end"
                        isOpen={isModalOpenUpdate}
                        onClose={closeModal}
                        type="message"
                        buttonCancel={
                            <Button
                                // onClick={() => handleCloseModal('addActivity')}
                                hiddenParent="addActivity" variant="btn-secondary" type="button">
                                Hủy
                            </Button>
                        }
                        buttonConfirm={<Button
                            // onClick={() => formikActivity.submitForm()}
                            variant="btn-primary"
                            icon={<FontAwesomeIcon icon={faPlus} />}
                            size="text-sm w-20"
                        >
                            Lưu
                        </Button>}
                    >
                    </Modal>
                    <Modal id={"denyConfirmModal"}
                        width="max-w-xl"
                        title={"Bạn muốn xóa sinh viên này?"}
                        content={<></>}
                        iconPopup={<FontAwesomeIcon icon={faCircleExclamation} className="text-yellow-600 w-24 h-24" />}
                        positionButton="center"
                        buttonCancel={<Button onClick={closeModal} hiddenParent="demoDate" variant="btn-secondary" type="button" size="text-sm px-6 py-3">Hủy</Button>}
                        buttonConfirm={
                            <Button
                                variant="btn-primary" type="button" size="text-sm px-6 py-3">Xác Nhận
                            </Button>
                        }
                        isOpen={isModalOpenConfirm}
                        onClose={closeModal}
                        type="message"
                    >
                    </Modal>
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

export default StudentManagePage;