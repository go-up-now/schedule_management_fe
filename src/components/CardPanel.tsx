import React, { useState } from "react";
import Button from "./Button.tsx";
import Modal from "../components/Modal.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { registerClazz } from '../services/StudyInService.js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setModal } from '../reducers/modalSlice.tsx'

interface Props {
    clazz: string;
    room: string;
    shift: string;
    amount: string;
    dateStart?: string;
    dateWeek?: string;
    className?: string;
    disableIconHeader?: boolean;
    disabled?: boolean;
    clazzId?: number;
}
// <div className="mb-5 space-x-3 flex flex-wrap md:flex-nowrap ">    thêm này bao quanh nếu mún dùng nhiều  mini để repon 

export default function CardPanel({ clazz, room, shift, amount, dateStart, dateWeek, className = "", disableIconHeader = false, disabled = false, clazzId }: Props) {
    const [isModalOpenConfirm, setIsModalConfirmOpen] = useState(false);
    const isOpen = useSelector((state) => state.modal.isOpen);
    const dispatch = useDispatch();

    const handlRegistrationClazz = async (id, type) => {
        if (type === "registration")
            setIsModalConfirmOpen(true);
        else {
            try {
                let response = await registerClazz(id);
                if (response && response.data && response.data.code !== 200) {
                    toast.error(response.data.message)
                }
                else if (response && response.code === 200) {
                    dispatch(
                        setModal({
                            isOpen: !isOpen
                        })
                    );
                    toast.success(response.message)
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    toast.error("Đã xảy ra lỗi khi đăng ký lớp học");
                }
            }
            setIsModalConfirmOpen(false);
        }

    }

    const closeModal = () => {
        setIsModalConfirmOpen(false);
    }

    return (
        <div className={"w-full md:w-full bg-white rounded-2xl mb-4 md:mb-0" + className} key={clazzId}>
            <div className={"h-auto w-full bg-white rounded-lg p-5 relative shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"}>
                <div className="flex justify-between">
                    <div>
                        <p >Tên lớp: <span className="font-bold">{clazz}</span></p>
                        <p >Phòng: <span className="font-bold">{room}</span></p>
                        <p >Ca học: <span className="font-bold">{shift}</span></p>
                        <p >Số lượng sinh viên: <span className="font-bold">{amount}</span></p>
                        <p >Ngày bắt đầu: <span className="font-bold">{dateStart}</span></p>
                        <p >Ngày học trong tuần: <span className="font-bold">{dateWeek}</span></p>
                        <div>
                            <Button
                                type="button"
                                size="xs"
                                variant="btn-none"
                                className="bg-blue-500 p-2 w-full md:w-20 self-center mt-1"
                                disabled={disabled}
                                onClick={() => handlRegistrationClazz(null, "registration")}
                            >
                                Đăng ký
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal id={"denyConfirmModal"}
                width="max-w-xl"
                title={"Bạn muốn đăng ký lớp học " + clazz + " ?"}
                content={<></>}
                iconPopup={<FontAwesomeIcon icon={faCircleExclamation} className="text-yellow-600 w-24 h-24" />}
                positionButton="center"
                buttonCancel={<Button onClick={closeModal} hiddenParent="demoDate" variant="btn-secondary" type="button" size="text-sm px-6 py-3">Hủy</Button>}
                buttonConfirm={<Button onClick={() => handlRegistrationClazz(clazzId, "confirm")}
                    variant="btn-primary" type="button" size="text-sm px-6 py-3">Xác Nhận</Button>}
                isOpen={isModalOpenConfirm}
                onClose={closeModal}
                type="message"
            >
            </Modal>
        </div >
    );
}