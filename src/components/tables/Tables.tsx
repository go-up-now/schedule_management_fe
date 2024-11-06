import React, { useState, useEffect } from "react";
import SelectBox from "../SelectBox.tsx";
import Spinner from "../Spinner.tsx";
import { FaSearch } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface TableProps<T> {
    data: T[]; // Data to display
    headers: string[]; // Table headers
    renderRow: (item: T) => React.ReactNode[]; // Function to render each row
    advanced?: boolean; // Show search bar, select box, and row count
    optionsValue?: Array<{ value: string | number | boolean | undefined, label: string | number, disable?: boolean, valueClassName?: string }>; // Options for select box
    selectBoxName?: string; // Name for select box
    maxRow?: number; // Max rows per page (default is 10)
    disableSelectBox?: boolean; // Disable select box
    advancedRowFilter?: boolean; // Enable advanced row filtering
    loading?: boolean; // Add a loading state
    nonDataMessage?: string;
}

const Tables = <T extends object>({
    data,
    headers,
    renderRow,
    advanced = false,
    optionsValue = [],
    selectBoxName = '',
    maxRow,
    disableSelectBox = false,
    advancedRowFilter = false,
    nonDataMessage = 'Không có dữ liệu',
    loading = false,
}: TableProps<T>) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(maxRow ?? 10);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        setFilteredData(
            // data.filter((item) =>
            //     (selectedFilter === '' || Object.values(item).some((val) => val?.toString().includes(selectedFilter))) &&
            //     Object.values(item).some((val) => val?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
            // )
            data.filter((item) =>
                (selectedFilter === '' ||
                    Object.entries(item).some(([key, val]) =>
                        // Kiểm tra nếu giá trị là object thì lọc trong đó, nếu không thì kiểm tra trực tiếp
                        typeof val === 'object' && val !== null
                            ? Object.values(val).some(innerVal => innerVal?.toString().includes(selectedFilter))
                            : val?.toString().includes(selectedFilter)
                    )) &&
                Object.entries(item).some(([key, val]) =>
                    // Tương tự cho searchTerm
                    typeof val === 'object' && val !== null
                        ? Object.values(val).some(innerVal => innerVal?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
                        : val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            )

        );
        setCurrentPage(0);
    }, [data, searchTerm, selectedFilter]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const currentData = filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    return (
        <div className="relative overflow-x-auto sm:rounded-lg bg-white ">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spinner /> {/* Render Spinner while loading */}
                </div>
            ) : (
                <>
                    {advanced && (
                        <div className="flex md:flex-row flex-col md:justify-between justify-start mb-3">
                            <div className="flex-none text-sm text-[#808EA1] md:self-center ms-2">Số lượng: {filteredData.length}</div>
                            {/* Search Bar */}
                            <div className="relative mr-3 md:w-5/12 md:my-0 my-2 w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                    <FaSearch className="w-4 h-4 fill-[#808EA1]" />
                                </div>
                                <input
                                    id="search"
                                    className="border border-gray-300 shadow-md text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:outline-none hover:border-[#434343] focus:border-[#434343] transition duration-300"
                                    name="search"
                                    aria-label="Search Bar"
                                    placeholder="Tìm kiếm..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            {/* Select Box */}
                            {!disableSelectBox && (
                                <SelectBox
                                    options={optionsValue}
                                    name={selectBoxName}
                                    disableDefaultOption={true}
                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                />
                            )}
                        </div>
                    )}
                    <div className="overflow-x-auto">
                        {/* Desktop view */}
                        <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 hidden md:table">
                            <thead className="text-xs text-[#808EA1] bg-[#F8F8F8]">
                                <tr>
                                    <th scope="col" className="px-3 py-4">STT</th>
                                    {headers.map((header, index) => (
                                        <th key={index} scope="col" className="px-6 py-4">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((item, index) => (
                                    <tr key={index} className="bg-white border-t hover:text-black hover:bg-gray-100 text-[#808EA1] text-xs">
                                        <th className="px-3 py-4">{index + 1 + currentPage * rowsPerPage}</th>
                                        {renderRow(item)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                        {/* Mobile view */}
                        {/* <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 md:hidden">
                            <tbody>
                                {currentData.map((item, index) => (
                                    <tr key={index} className="bg-white border-2 rounded-lg mb-4 text-xs border-slate-300">
                                        <td className="px-6 py-2 flex justify-between">
                                            <span className="font-semibold">STT</span>
                                            <span className="px-6">{index + 1 + currentPage * rowsPerPage}</span>
                                        </td>
                                        {headers.map((header, headerIndex) => (
                                            <td key={headerIndex} className="px-6 py-2 flex justify-between border-t">
                                                <span className="font-semibold self-center">{header}</span>
                                                <span className="self-center">{renderRow(item)[headerIndex]}</span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table> */}
                    </div>
                    {currentData.length === 0 && <div className="border flex justify-center items-center w-full py-20 text-2xl">{nonDataMessage}</div>}
                    <section className={`flex items-center my-3 px-4`}>
                        <div className="flex-grow flex justify-center items-center">
                            <div className="flex items-center">
                                <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                                    <FaAngleLeft className={`w-4 h-4 mt-[0.1rem] ${currentPage === 0 ? "fill-[#808EA1]" : "fill-[#000000]"}`} />
                                </button>
                                <p className="font-bold mx-3 text-md">{currentPage + 1}/{totalPages}</p>
                                <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                                    <FaAngleRight className={`w-4 h-4 mt-[0.1rem] ${currentPage === totalPages - 1 ? "fill-[#808EA1]" : "fill-[#000000]"}`} />
                                </button>
                            </div>
                        </div>
                        {advancedRowFilter &&
                            <div className="flex items-center gap-3">
                                <span>Xem</span>
                                <SelectBox
                                    name="rowFilter"
                                    onChange={(event) => {
                                        setRowsPerPage(parseInt(event.target.value));
                                        setCurrentPage(0)
                                    }}
                                    options={[{ label: '10', value: 10 }, { label: '25', value: 25 }, { label: 50, value: 50 }, { label: '100', value: 100 }]}
                                    disableDefaultOption
                                />
                                <span>Mục</span>
                            </div>
                        }
                    </section>
                </>
            )}
        </div>
    );
};

export default Tables;