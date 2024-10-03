import React, { useState } from "react";
import MiniPanel from "../../components/MiniPanel.tsx";
import CardBasicExample from "../../components/Card.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCircleCheck, faUser } from "@fortawesome/free-solid-svg-icons";

const RegistrationPage = (props) => {
    const { name, code, credit } = props
    return (
        <div className="flex justify-between gap-3">

            <MiniPanel name={name} code={code} className="w-[13rem]" credit={credit} />

            <CardBasicExample />
        </div>
    )
}
export default RegistrationPage;