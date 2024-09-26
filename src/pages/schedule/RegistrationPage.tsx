import React, { useState } from "react";
import MiniPanel from "../../components/MiniPanel.tsx";
import CardBasicExample from "../../components/Card.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCircleCheck, faUser } from "@fortawesome/free-solid-svg-icons";

const RegistrationPage = () => {
    return (
        <div className="flex justify-between gap-3">

            <MiniPanel name="Thiết kế UX/UI" code='WEB105' className="w-[13rem]" credit={3} />

            <CardBasicExample />
        </div>
    )
}
export default RegistrationPage;