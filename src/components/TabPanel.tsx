import React from "react"

export default function TabPanel({ title }: { title: string }) {
    return (
        <ul className={`flex flex-wrap text-sm mx-2 font-medium text-start sm:text-center`} role="tablist" >
            <li className="border shadow-md rounded sm:round-none sm:shadow-none sm:border-0 w-full sm:w-auto m-0 sm:mr-2" role="presentation">
                <button className={`inline-block p-2 rounded-t-lg text-black border-blue-500 border-b-2`} type="button" role="tab"
                >
                    {title}
                </button>
            </li>
        </ul>
    )
}