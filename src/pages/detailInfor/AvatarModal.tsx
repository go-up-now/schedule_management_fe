import React, { useState } from "react";

const AvatarModal = ({ onImageChange }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [warningMessage, setWarningMessage] = useState<string | null>(null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = async () => {
                if (img.width < 800 || img.height < 1000) {
                    setWarningMessage("Kích thước ảnh phải ít nhất 800x1000");
                    onImageChange(null)
                    setImagePreview("");
                } else {
                    setWarningMessage(null);
                    onImageChange(file)
                    if (file) {
                        const imageUrl = URL.createObjectURL(file); // Tạo URL xem trước cho tệp
                        setImagePreview(imageUrl); // Cập nhật state để hiển thị ảnh
                    }
                }
            };
        }
    };

    return (
        <>
            <div className="w-full flex items-center justify-center">
                <label htmlFor="avatar" className="w-52">
                    <div className="w-52 h-52 cursor-pointer border-dashed border-2 border-gray-300 flex items-center justify-center">
                        {imagePreview ? (
                            <img src={imagePreview as string} alt="Preview" className="w-full h-full object-contain " />
                        ) :
                            // formik.values.user?.avatar ?
                            //     (
                            //         <img src={formik.values.user?.avatar as string} alt="Preview" className="w-full h-full object-contain " />
                            //     ) :
                            (
                                <div className="w-800 h-600 bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500">Avatar [800 x 1000]</span>
                                </div>
                            )}
                    </div>
                </label>
            </div>
            <input
                id="avatar"
                name="avatar"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
                className="hidden"
            />
            <div className='text-red-500'>{warningMessage ? warningMessage : ""}</div>
        </>
    )
}

export default AvatarModal;