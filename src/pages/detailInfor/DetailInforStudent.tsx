import React, { useEffect, useState } from "react";
import TitleHeader from "../../components/TitleHeader";
import TextField from '../../components/TextField.tsx';
import TextArea from '../../components/TextArea.tsx';
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import AvatarModal from "./AvatarModal.tsx";
import { faCamera, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import avatar from '../../assets/avatarUser.jpg';
import Spinner from "../../components/Spinner.tsx";
import { updateImageAPI } from '../../services/userService.js';
import { toast } from 'react-toastify';
import { getStudentMyInforAPI } from "../../services/StudentService.js";
import { useDispatch } from 'react-redux';
import { setUser } from '../../reducers/userSlice.tsx';

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
    area: {
        name: string;
    };
    avatar: string;
    status: boolean;
}

interface Student {
    id: number;
    enterSchool: string;
    semester: string;
    year: number;
    user: User;
    education_program: {
        name: string;
        year: number;
        major: {
            name: string;
        }
    }
}

const DetailInforStudent = () => {
    // const userInfo = useSelector((state) => state.user.userInfo);
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const [userInfo, setUserInfo] = useState<Student>();
    const [publicId, setPublicId] = useState("");

    const openModal = () => {
        setIsModalOpen(true);
        setPublicId(getPublicIdFromUrl(userInfo && userInfo.user.avatar ? userInfo.user.avatar : ''))
    }

    const closeModal = () => {
        setIsModalOpen(false);
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

    // Hàm nhận tệp hình ảnh từ component con
    const handleImageChange = (file) => {
        setImageFile(file);
        if (file == null)
            setIsHidden(true)
        else
            setIsHidden(false)
    };

    // Hàm cập nhật hình đại diện
    const handleSubmitImage = async () => {
        setLoading(true); // Bắt đầu loading

        const formData = new FormData();

        // Thêm file ảnh vào FormData nếu có
        if (imageFile) {
            formData.append('avatar', imageFile);
        }
        else {
            formData.append('avatar', "");
        }

        formData.append('publicId', publicId);

        try {
            let response = await updateImageAPI(userInfo.user.id, formData);
            if (response && response.code == 200) {
                handleImageAPI();
                toast.success(response.message)
            }
            else {
                toast.error('Cập nhật hình đại diện không thành công')
            }
        } catch (error) {
            toast.error('Cập nhật hình đại diện không thành công')
        }
        setLoading(false); // Kết thúc loading
        closeModal();
    };

    const handleImageAPI = async () => {
        let response = await getStudentMyInforAPI();
        if (response && response.data) {
            setUserInfo(response.data)
            dispatch(setUser({
                userInfo: response.data,
            }));
        }
    }

    useEffect(() => {
        handleImageAPI();
    }, [])

    if (userInfo)
        return (
            <>
                <TitleHeader title={`THÔNG TIN HỌC VẤN`} />
                <div className="w-full bg-white p-4 shadow-md rounded-2xl ">
                    <form action="/" className="w-full flex flex-wrap">
                        <div className="w-full lg:w-4/12 p-1 flex flex-col items-center">
                            <div className="relative">
                                <label htmlFor="avatar" className="w-40 ">
                                    <div className="w-40 h-40 rounded-full border border-2 border-gray-300 flex items-center justify-center">
                                        <img className="w-40 h-40 rounded-full" src={
                                            userInfo && userInfo.user ? (
                                                userInfo.user.avatar ? userInfo.user.avatar : avatar
                                            ) : avatar
                                        } alt="Preview" />
                                    </div>
                                </label>
                                <div className="absolute bottom-5 right-0">
                                    <Button
                                        type="button"
                                        size="xs"
                                        variant="btn-none"
                                        className="text-slate-600 bg-gray-200 text-2xl w-8 h-8 p-2 self-center rounded-full "
                                        onClick={openModal}
                                    >
                                        <FontAwesomeIcon icon={faCamera} />
                                    </Button>
                                </div>
                            </div>
                            <div className="w-full flex flex-wrap">
                                <div className="w-full mt-2">
                                    <TextField
                                        label="Mã Số Sinh Viên"
                                        id="code"
                                        width="w-full"
                                        disable={true}
                                        type="text"
                                        disableLabel={false}
                                        className={`w-full`}
                                        value={userInfo && userInfo.user ? userInfo.user.code : ''}
                                    />
                                </div>
                                <div className="w-full mt-2">
                                    <TextField
                                        label="Họ Tên"
                                        id="name"
                                        width="w-full"
                                        disable={true}
                                        type="text"
                                        disableLabel={false}
                                        className={`w-full`}
                                        value={userInfo && userInfo.user ? userInfo.user.lastName + ' ' + userInfo.user.firstName : ''}
                                    />
                                </div>
                                <div className="w-full mt-2">
                                    <TextField
                                        label="Email"
                                        id="email"
                                        width="w-full"
                                        disable={true}
                                        type="text"
                                        disableLabel={false}
                                        className={`w-full`}
                                        value={userInfo && userInfo.user ? userInfo.user.email : ''}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-full lg:w-8/12 flex flex-wrap">
                            <div className="w-full lg:w-6/12 p-1">
                                <TextField
                                    label="Trạng Thái"
                                    id="status"
                                    width="w-full"
                                    type="text"
                                    disableLabel={false}
                                    disable={true}
                                    className={`w-full `}
                                    value={userInfo && userInfo.user ? (userInfo.user.status ? 'Đang học' : 'Đã tốt nghiệp') : ''}
                                />
                            </div>
                            <div className="w-full lg:w-6/12 p-1">
                                <TextField
                                    label="Cơ Sở"
                                    id="area"
                                    width="w-full"
                                    disable={true}
                                    type="text"
                                    disableLabel={false}
                                    className={`w-full `}
                                    value={userInfo && userInfo.user ? userInfo.user.area.name : ''}
                                />
                            </div>
                            <div className="w-full lg:w-6/12 p-1">
                                <TextField
                                    label="Chương Trình Học"
                                    id="education-program"
                                    width="w-full"
                                    disable={true}
                                    type="text"
                                    disableLabel={false}
                                    className={`w-full`}
                                    value={userInfo && userInfo.user ? userInfo.education_program.name : ''}
                                />
                            </div>
                            <div className="w-full lg:w-6/12 p-1">
                                <TextField
                                    label="Chuyên Ngành"
                                    id="major"
                                    width="w-full"
                                    type="text"
                                    disable={true}
                                    disableLabel={false}
                                    className={`w-full `}
                                    value={userInfo && userInfo.user ? userInfo.education_program.major.name : ''}
                                />
                            </div>
                            <div className="w-full lg:w-6/12 p-1">
                                <TextField
                                    label="Khóa Học"
                                    id="year"
                                    width="w-full"
                                    type="text"
                                    disable={true}
                                    disableLabel={false}
                                    className={`w-full `}
                                    value={userInfo && userInfo.user ? userInfo.education_program.year : ''}
                                />
                            </div>
                            <div className="w-full lg:w-6/12 p-1">
                                <TextField
                                    label="Học Kỳ"
                                    id="semester"
                                    width="w-full"
                                    type="text"
                                    disable={true}
                                    disableLabel={false}
                                    className={`w-full `}
                                    value={userInfo && userInfo.user ? userInfo.semester : ''}
                                />
                            </div>
                            <div className="w-full lg:w-6/12 p-1">
                                <TextField
                                    label="Bậc Đào Tạo"
                                    id="education-level"
                                    width="w-full"
                                    disable={true}
                                    type="text"
                                    disableLabel={false}
                                    className={`w-full `}
                                    value={'Cao đẳng'}
                                />
                            </div>
                            <div className="w-full lg:w-6/12 p-1">
                                <TextField
                                    label="Ngày Vào Trường"
                                    id="enter-school"
                                    width="w-full"
                                    disable={true}
                                    type="date"
                                    disableLabel={false}
                                    className={`w-full `}
                                    value={userInfo && userInfo.user ? userInfo.enterSchool : ''}
                                />
                            </div>
                            <div className="w-full lg:w-6/12 p-1">
                                <TextField
                                    label="Loại Hình Đào Tạo"
                                    id="education-category"
                                    width="w-full"
                                    disable={true}
                                    type="text"
                                    disableLabel={false}
                                    className={`w-full `}
                                    value={'Chính quy'}
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-12/12 p-1 mt-10">
                            <TitleHeader title={`THÔNG TIN CÁ NHÂN`} />
                        </div>
                        <div className="w-full lg:w-4/12 flex flex-col items-center">
                            <div className="w-full flex flex-wrap">
                                <div className="w-full p-1">
                                    <TextField
                                        label="Ngày Sinh"
                                        id="birthday"
                                        width="w-full"
                                        type="text"
                                        disableLabel={false}
                                        disable={true}
                                        className={`w-full `}
                                        value={userInfo && userInfo.user ? (userInfo.user.birthday == null ? '' : userInfo.user.birthday) : ''}
                                    />
                                </div>
                                <div className="w-full p-1">
                                    <TextField
                                        label="Nơi Sinh"
                                        id="address"
                                        width="w-full"
                                        disable={true}
                                        type="text"
                                        disableLabel={false}
                                        className={`w-full `}
                                        value={userInfo && userInfo.user ? (userInfo.user.address == null ? '' : userInfo.user.address) : ''}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-full lg:w-8/12 flex flex-wrap">
                            <div className="w-full lg:w-6/12 p-1">
                                <TextField
                                    label="Giới Tính"
                                    id="gender"
                                    width="w-full"
                                    disable={true}
                                    type="text"
                                    disableLabel={false}
                                    className={`w-full `}
                                    value={userInfo && userInfo.user ? (userInfo.user.gender == 1 ? 'Nam' : userInfo.user.gender == 0 ? 'Nữ' : '') : ''}
                                />
                            </div>
                            <div className="w-full lg:w-6/12 p-1">
                                <TextField
                                    label="Số Điện Thoại"
                                    id="phone"
                                    width="w-full"
                                    disable={true}
                                    type="text"
                                    disableLabel={false}
                                    className={`w-full`}
                                    value={userInfo && userInfo.user ? (userInfo.user.phone == null ? '' : userInfo.user.phone) : ''}
                                />
                            </div>
                            <div className="w-full p-1">
                                <TextArea
                                    label="Mô Tả"
                                    id="description"
                                    width="w-full "
                                    rows={3}
                                    disable={true}
                                    disableLabel={false}
                                    className={`w-full `}
                                    value={userInfo && userInfo.user ? (userInfo.user.description == null ? '' : userInfo.user.description) : ''}
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <Modal id={"updateImage"}
                    width="w-full md:max-w-2xl h-auto"
                    title={`Cập nhật hình đại diện`}
                    content={
                        <AvatarModal
                            onImageChange={handleImageChange}
                        />
                    }
                    positionButton="end"
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    type="message"
                    buttonConfirm={
                        !isHidden &&
                        <Button
                            onClick={handleSubmitImage}
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
                        </Button>
                    }
                >
                </Modal>
            </>
        )
}

export default DetailInforStudent;