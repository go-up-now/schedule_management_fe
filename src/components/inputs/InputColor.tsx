import React from "react";

const InputColor = (props) => {
    const { title, type, placeholder, onclick, onchange, onKeyDown } = props;
    return (
        <>
            <label
                className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
                <span className="text-base font-medium text-gray-700"> {title} </span>
                <input
                    type={type}
                    placeholder={placeholder}
                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    onClick={onclick}
                    onChange={onchange}
                    onKeyDown={onKeyDown}
                />
            </label>
        </>
    )
}

export default InputColor;