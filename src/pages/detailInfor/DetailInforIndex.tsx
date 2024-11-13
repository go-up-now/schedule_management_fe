import React from "react";
import Container from "../../components/Container.tsx"
import { getUserScope } from '../../utilss/authUtils.ts'
import { ROLE } from '../../enum/Role.tsx'
import DetailInforStudent from "./DetailInforStudent.tsx";
import DetailInforAdmin from "./DetailInforAdmin.tsx";
import DetailInforInstructor from "./DetailInforInstructor.tsx";

const DetailInforIndex = () => {
    const userRoles: ROLE[] = getUserScope() ?? [ROLE.STUDENT]; // Lấy vai trò người dùng từ token

    return (
        <Container>
            {
                userRoles.includes(ROLE.ADMIN)
                    ?
                    <DetailInforAdmin />
                    :
                    userRoles.includes(ROLE.STUDENT)
                        ?
                        <DetailInforStudent />
                        :
                        <DetailInforInstructor />
            }
        </Container>
    )
}

export default DetailInforIndex;