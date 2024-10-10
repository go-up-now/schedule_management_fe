interface TextFieldProps {
    label?: string;
    id?: string;
    name?: string;
    value?: string | number; //nội dung
    width?: string; //chiều rộng tối thiểu của text field
    className?: string; //css cho text field bằng tailwindcss
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disable?: boolean;
    type?: string;
    max?: number | string;
    min?: number | string;
    disableLabel?: boolean;
    readOnly?: boolean; // chỉ cho phép đọc
    required?: boolean
}

export default function TextField({ id, label = "Label", value, width, className, name, required = false, onChange, disable = false, type = "text", max, min, disableLabel = false, readOnly }: TextFieldProps) {
    return (
        <div className={`${className}`}>
            <div className="flex flex-row">
                <div className={(disable ? "bg-[#e7e9eb] cursor-not-allowed " : " bg-white ") + "shadow-md py-2 pe-3 border hover:border-[#434343] transition duration-300 rounded-lg col-span-3 " + width + " " + className}>
                    {disableLabel ? null : <p className="text-[#9A9A9A] text-xs pl-3">{label}:{required && <span className="text-red-500">*</span>}</p>}
                    <input id={id} type={type} className={`md:text-sm pl-3 font-semibold min-h-7 appearance-none outline-none w-full ${disable && 'cursor-not-allowed'}`} readOnly={readOnly} disabled={disable} value={value} name={name} onChange={onChange} max={max} min={min}></input>
                </div>
            </div>
        </div>
    );
}
