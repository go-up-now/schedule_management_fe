import React, { useState, useEffect } from "react";
import TitleHeader from "../../../components/TitleHeader.tsx";
import Button from "../../../components/Button.tsx";
import SelectBox from "../../../components/SelectBox.tsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Tables from "../../../components/tables/Tables.tsx";
import CardBox from "../../../components/CartBox.tsx";
import { faEllipsis, faFile, faPlus, faPen, faUserCheck, faUserGroup, faUserXmark, faTrash, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { getAllStudents, createStudentAPI, updateStudentAPI, deleteStudentAPI, importExcelStudentAPI } from "../../../services/StudentService.js";
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
import UploadExcelModal from '../../../components/excel/UpLoadExcel.tsx'
import Spinner from '../../../components/Spinner.tsx'

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
    const [isModalOpenExcel, setIsModalOpenExcel] = useState(false);
    const { isConfirmOpen, openConfirm, closeConfirm, confirmAction, confirmQuestion } = useConfirm();
    const [isStudent, setIsStudent] = useState<TypeStudent | null>(null);
    const [isReLoadTable, setIsReLoadTable] = useState(false);
    const [publicId, setPublicId] = useState("");
    const [loading, setLoading] = useState(false);

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
                // if (userInfo && userInfo.user) {
                //     let userAreaId = userInfo.user.area.id
                //     let students = response.data.filter(student => userAreaId == student.user.area.id)
                //     setListStudent(students)
                // }
                // else if (userInfo) {
                //     let userAreaId = userInfo.area.id
                //     let students = response.data.filter(student => userAreaId == student.user.area.id)
                //     setListStudent(students)
                // }
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
        setIsModalOpenExcel(false);
        setIsStudent(null);
        formikStudent.resetForm();
    }

    const openModal = async (item, id) => {
        if (id === 'insert') {
            setIsModalOpenInsert(true);
        }
        else if (id === 'Sửa') {
            setIsStudent(item);
            setIsModalOpenUpdate(true);
            setPublicId(getPublicIdFromUrl(item.user.avatar))
        }
        else if (id === 'Xóa') {
            setIsStudent(item);
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

    const formikStudent = useFormik({
        initialValues: {
            id: isStudent ? isStudent.id : 0,
            enterSchool: isStudent ? isStudent.enterSchool : '',
            semester: isStudent ? isStudent.semester : '',
            education_program: isStudent ? isStudent.education_program.code : '',
            year: isStudent ? isStudent.year : '',
            user: {
                code: isStudent ? isStudent.user.code : '',
                lastName: isStudent ? isStudent.user.lastName : '',
                firstName: isStudent ? isStudent.user.firstName : '',
                email: isStudent ? isStudent.user.email : '',
                password: isStudent ? '12345' : '',
                gender: isStudent ? isStudent.user.gender : '',
                birthday: isStudent ? isStudent.user.birthday : '',
                phone: isStudent ? isStudent.user.phone : '',
                address: isStudent ? isStudent.user.address : '',
                description: isStudent ? isStudent.user.description : '',
                area: isStudent ? isStudent.user.area.id : '',
                avatar: isStudent ? isStudent.user.avatar : '',
                status: isStudent ? isStudent.user.status : true,
            },
        },
        enableReinitialize: true,
        validationSchema: StudentSchema,

        onSubmit: async (values, { resetForm }) => {
            // Tạo FormData
            const formData = new FormData();

            // Tạo bản sao user với avatar là chuỗi rỗng
            const userWithoutAvatar = {
                ...values.user,
                avatar: '', // Thiết lập avatar thành chuỗi rỗng
            };

            // Chuyển object student thành JSON và thêm vào FormData
            const studentJson = JSON.stringify({
                ...values,
                user: userWithoutAvatar,
            });
            formData.append('student', studentJson);

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
                        const response = await createStudentAPI(formData);
                        if (response && response.data) {
                            if (response.data.code !== 200)
                                toast.error(response.data.message)
                            if (response.code === 200) {
                                toast.success("Thêm mới sinh viên thành công")

                                let responseAllStudents = await getAllStudents();
                                setListStudentAPI(responseAllStudents.data)
                                setListStudent(responseAllStudents.data)
                                const activeStudents = responseAllStudents.data.filter(item => item.user.status);
                                setListActivityStudent(activeStudents);
                            }
                        }
                    } catch (error) {
                        console.log(error);
                        toast.error("Thêm sinh viên không thành công")
                    }
                } else {
                    formData.append('publicId', publicId);
                    try {
                        await updateStudentAPI(values.id, formData);
                        let responseAllStudents = await getAllStudents();
                        setListStudentAPI(responseAllStudents.data)
                        setListStudent(responseAllStudents.data)
                        const activeStudents = responseAllStudents.data.filter(item => item.user.status);
                        setListActivityStudent(activeStudents);
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
        },
    });

    // xử lý khi imoport excel thành công
    const handleImportDataSuccess = (responseAllStudents) => {
        setListStudentAPI(responseAllStudents.data)
        setListStudent(responseAllStudents.data)
        const activeStudents = responseAllStudents.data.filter(item => item.user.status);
        setListActivityStudent(activeStudents);
    }

    const handleDelete = async () => {
        if (isStudent) {
            try {
                let response = await deleteStudentAPI(isStudent.id);
                console.log(response)
                if (response && response.data) {
                    if (response.data.code !== 200)
                        toast.error("Xóa không thành công, sinh viên này đã đăng ký lớp học")
                }
                else if (response) {
                    if (response.code === 200) {
                        let responseAllStudents = await getAllStudents();

                        setListStudentAPI(responseAllStudents.data)
                        setListStudent(responseAllStudents.data)
                        const activeStudents = responseAllStudents.data.filter(item => item.user.status);
                        setListActivityStudent(activeStudents);
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

    const extractedData = listStudent.map(item => ({
        id: item.id,
        education_program: item.education_program.code, // Lấy mã chương trình học
        enterSchool: item.enterSchool,
        semester: item.semester,
        year: item.year,
        major: item.education_program.major.code,

        code: item.user.code,
        lastName: item.user.lastName,
        firstName: item.user.firstName,
        email: item.user.email,
        gender: item.user.gender,
        phone: item.user.phone,
        birthday: item.user.birthday,
        address: item.user.address,
        area: item.user.area.name,
    }));

    const dataTemplate = [
        {
            education_program: "EP_LOGISTICS",
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
            education_program: "EP_LOGISTICS",
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
            handleSelectBox(userInfo && userInfo.user ? userInfo.user.area.id : userInfo ? userInfo.area.id : "", selectedSemester, selectedMajor);
        }
        else if (isDataLoaded) {
            handleSelectBox(selectedArea, selectedSemester, selectedMajor)
        }
    }, [selectedArea, isDataLoaded, selectedSemester, selectedMajor, userInfo, isReLoadTable]);

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
                        loading={isLoading}
                        advancedRowFilter
                    />

                    {/* Thêm mới sinh viên */}
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
                        title={`Cập nhật sinh viên`}
                        content={
                            <StudentModal formik={formikStudent}
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
                                onClick={() => formikStudent.submitForm()}
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
                                setListAPI={setListStudentAPI}
                                setList={setListStudent}
                                setListActivity={setListActivityStudent}
                                setListUnActivity
                                setIsReLoadTable={setIsReLoadTable}
                                isReLoadTable={isReLoadTable}
                                dataTemplate={dataTemplate}
                                exportFileName="Danh sách sinh viên"
                                exportFileNamePattern="Danh sách sinh viên mẫu để import"
                                sheetName='DSSV'
                                getAllObject={getAllStudents}
                                importExcelAPI={importExcelStudentAPI}
                                isUser={true}
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

export default StudentManagePage;