import Container from "../../components/Container.tsx"
import React, { useEffect, useState } from "react";
import { getUserScope } from '../../utilss/authUtils.ts'
import { ROLE } from '../../enum/Role.tsx'
import HelpPageStudent from "./HelpPageStudent.tsx";

const HelpPageIndex = () => {
    const userRoles: ROLE[] = getUserScope() ?? [ROLE.STUDENT]; // Lấy vai trò người dùng từ token

    return (
        <Container> 
            {
                userRoles.includes(ROLE.ADMIN)
            ?
            'ADMIN PAGE'
            :
            userRoles.includes(ROLE.STUDENT)
            ?
            <HelpPageStudent />
            :
            'INSTRUCTOR PAGE'
            }
        </Container>
    )
}

export default HelpPageIndex;