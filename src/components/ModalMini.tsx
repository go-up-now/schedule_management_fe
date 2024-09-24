import React from "react";

const ModalMini = () => {
    return (
        <div className="absolute left-[-100px] top-0 bg-white shadow-lg rounded p-2">
            <button className="block text-left w-full px-4 py-2 text-gray-800 hover:bg-gray-100">
                Edit
            </button>
            <button className="block text-left w-full px-4 py-2 text-gray-800 hover:bg-gray-100">
                Delete
            </button>
        </div>
    )
}

export default ModalMini;