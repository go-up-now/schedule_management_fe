import React from 'react';

interface TextareaProps {
    label: string;
    id?: string;
    name?: string;
    value?: string;
    width?: string; // Prop để điều chỉnh chiều dài của textarea
    rows?: number; // Prop để điều chỉnh số hàng của textarea
    cols?: number; // Prop để điều chỉnh số cột của textarea
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disable?: boolean;
    disableLabel?: boolean;
    readOnly?: boolean; // thêm thuộc tính này
}

const Textarea: React.FC<TextareaProps> = ({
    id,
    label = "Label",
    value,
    width = "10rem", // Giá trị mặc định cho chiều dài
    rows = 2, // Giá trị mặc định cho số hàng
    cols = 100, // Giá trị mặc định cho số cột
    className,
    name,
    onChange,
    disable = false,
    disableLabel = false,
    readOnly
}) => {
    return (
        <div className="flex flex-row">
            <div className={(disable ? "bg-[#e7e9eb] " : "bg-white ") + "shadow-md py-2 pe-3 border hover:border-[#434343] transition duration-300 rounded-lg col-span-3 " + className} style={{ width: width }}>
                <div>
                    {disableLabel ? null : <p className="text-[#9A9A9A] md:text-md text-sm font-normal pl-3">{label}:</p>}
                    <textarea
                        id={id}
                        className="md:text-sm pl-3 font-semibold appearance-none outline-none resize-none"
                        disabled={disable}
                        value={value}
                        name={name}
                        onChange={onChange}
                        rows={rows}
                        cols={cols}
                        style={{ width: '100%' }}
                        readOnly={readOnly}
                    />
                </div>
            </div>
        </div>
    );
};

export default Textarea;
