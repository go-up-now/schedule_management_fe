import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card.tsx";

import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Activity, DEFAULT_IMAGE_CHUYEN_MON, DEFAULT_IMAGE_NGOAI_KHOA } from "../types/activityType.ts";
import { convertToDisplayFormat } from "../utilss/convertDateAndString.ts";
import TitleHeader from "./TitleHeader.tsx";
import React, { Link } from "react-router-dom";

interface ActivityListProps {
    activities: Activity[];
    title: string
}

export default function ListBox({ activities, title }: ActivityListProps) {
    const itemCount = activities.length;
    const itemInPage = 6;
    const totalPages = Math.ceil(itemCount / itemInPage);

    const [currentPage, setCurrentPage] = useState(0);

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

    return (
        <div className="w-full bg-white p-4">
            <TitleHeader title={title}></TitleHeader>
            <div className="w-full flex flex-wrap my-4 ">
                {activities
                    .filter((_, index) => index >= currentPage * itemInPage && index < (currentPage + 1) * itemInPage)
                    .map((activity) => (
                        <div key={activity.id} className="p-1 sm:p-2 w-6/12 md:w-6/12 lg:w-4/12 ">
                            <Link to={`/hoat-dong/${activity.id}`}>W
                                <Card
                                    title={activity.name}
                                    place={activity.place}
                                    date={convertToDisplayFormat(new Date)}
                                    img={activity.image ? activity.image : activity.typeId === 1 ? DEFAULT_IMAGE_CHUYEN_MON : DEFAULT_IMAGE_NGOAI_KHOA}
                                    imgClassName={"w-full border"}
                                />
                            </Link>
                        </div>
                    ))}
                <section className="flex justify-center items-center my-3 w-full">
                    <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                        <FontAwesomeIcon icon={faAngleLeft} className={currentPage === 0 ? "text-[#808EA1]" : "text-[#000000]"} />
                    </button>
                    <p className="font-bold mx-3 text-md">{currentPage + 1}/{totalPages}</p>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                        <FontAwesomeIcon icon={faAngleRight} className={currentPage === totalPages - 1 ? "text-[#808EA1]" : "text-[#000000]"} />
                    </button>
                </section>
            </div>
        </div>
    );
}
