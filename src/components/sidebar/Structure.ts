import { ROLE } from '../../enum/Role.tsx'

const sidebarStructure = [
    {
        id: "dashboard",
        title: "Dashboard",
        name: "Dashboard",
        parent: true,
        icon: "dasbor",
        link: "/",
        role: [ROLE.ADMIN, ROLE.INSTRUCTOR, ROLE.STUDENT]
    },
    {
        id: "user_list",
        title: "Quản lý người dùng",
        name: "users",
        parent: true,
        icon: "users",
        role: [ROLE.ADMIN],
        child: [
            {
                id: "student",
                title: "Sinh viên",
                name: "users.student",
                link: "/sinh-vien",
                icon: "dot",
                role: [ROLE.ADMIN]
            },
            {
                id: "instructor",
                title: "Giảng viên",
                name: "users.instructor",
                link: "/giang-vien",
                icon: "dot",
                role: [ROLE.ADMIN]
            }
        ]
    },
    {
        id: "clazz-management",
        title: "Quản lý lớp học",
        name: "clazzManagement",
        parent: true,
        icon: "clazz",
        role: [ROLE.ADMIN],
        child: [
            {
                id: "clazz",
                title: "Lớp học",
                name: "clazzManagement.clazz",
                link: "/lop-hoc",
                icon: "dot",
                role: [ROLE.ADMIN]
            },
            {
                id: "clazz-open",
                title: "Mở lớp",
                name: "clazzManagement.clazz-open",
                link: "/mo-lop",
                icon: "dot",
                role: [ROLE.ADMIN]
            }
        ]
    },
    {
        id: "study",
        title: "Học tập",
        name: "study",
        parent: true,
        icon: "study",
        role: [ROLE.STUDENT],
        child: [
            {
                id: "course-registration",
                title: "Đăng ký lớp học",
                name: "study.course-registration",
                link: "/dang-ky-mon-hoc",
                icon: "dot",
                role: [ROLE.STUDENT]
            },
            {
                id: "schedule-child",
                title: "Lịch học",
                name: "study.schedule-child",
                link: "/lich-hoc",
                icon: "dot",
                role: [ROLE.STUDENT]
            },
            {
                id: "exam-schedule",
                title: "Lịch thi",
                name: "study.exam-schedule",
                link: "/lich-thi",
                icon: "dot",
                role: [ROLE.STUDENT]
            }
        ]
    },
    {
        id: "mou",
        title: "MOU",
        name: "mou",
        parent: true,
        icon: "mou",
        link: "/dashboard/mou",
        role: [ROLE.STUDENT]
    },
    {
        id: "pusat-unduh-data",
        title: "Pusat Unduh Data",
        name: "pusatunduhdata",
        parent: true,
        icon: "pusatunduhdata",
        role: [ROLE.STUDENT],
        child: [
            {
                id: "unduh-data-transaksi",
                title: "Unduh Data Transaksi",
                name: "pusatunduhdata.unduhdatatransaksi",
                link: "/dashboard/download/transaction",
                icon: "dot",
                role: [ROLE.STUDENT]
            },
            {
                id: "unduh-data-perusahaan",
                title: "Unduh Data Perusahaan",
                name: "pusatunduhdata.unduhdataperusahaan",
                link: "/dashboard/download/company",
                icon: "dot",
                role: [ROLE.STUDENT]
            },
            {
                id: "unduh-data-mou",
                title: "Unduh Data MOU",
                name: "pusatunduhdata.unduhdatamou",
                link: "/dashboard/download/mou",
                icon: "dot",
                role: [ROLE.STUDENT]
            }
        ]
    }
];

export { sidebarStructure };
