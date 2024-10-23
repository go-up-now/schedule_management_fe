const sidebarStructure = [
    {
        id: "dashboard",
        title: "Dashboard",
        name: "Dashboard",
        parent: true,
        icon: "dasbor",
        link: "/"
    },
    {
        id: "user_list",
        title: "Quản lý người dùng",
        name: "users",
        parent: true,
        icon: "users",
        child: [
            {
                id: "student",
                title: "Sinh viên",
                name: "users.student",
                link: "/sinh-vien",
                icon: "dot"
            },
            {
                id: "instructor",
                title: "Giảng viên",
                name: "users.instructor",
                link: "/giang-vien",
                icon: "dot",
            }
        ]
    },
    {
        id: "clazz-management",
        title: "Quản lý lớp học",
        name: "clazzManagement",
        parent: true,
        icon: "clazz",
        child: [
            {
                id: "clazz",
                title: "Lớp học",
                name: "clazzManagement.clazz",
                link: "/lop-hoc",
                icon: "dot"
            },
            {
                id: "clazz-open",
                title: "Mở lớp",
                name: "clazzManagement.clazz-open",
                link: "/mo-lop",
                icon: "dot"
            }
        ]
    },
    {
        id: "study",
        title: "Học tập",
        name: "study",
        parent: true,
        icon: "study",
        child: [
            {
                id: "course-registration",
                title: "Đăng ký lớp học",
                name: "study.course-registration",
                link: "/dang-ky-mon-hoc",
                icon: "dot"
            },
            {
                id: "schedule-child",
                title: "Lịch học",
                name: "study.schedule-child",
                link: "/lich-hoc",
                icon: "dot"
            },
            {
                id: "exam-schedule",
                title: "Lịch thi",
                name: "study.exam-schedule",
                link: "/lich-thi",
                icon: "dot"
            }
        ]
    },
    {
        id: "mou",
        title: "MOU",
        name: "mou",
        parent: true,
        icon: "mou",
        link: "/dashboard/mou"
    },
    {
        id: "pusat-unduh-data",
        title: "Pusat Unduh Data",
        name: "pusatunduhdata",
        parent: true,
        icon: "pusatunduhdata",
        child: [
            {
                id: "unduh-data-transaksi",
                title: "Unduh Data Transaksi",
                name: "pusatunduhdata.unduhdatatransaksi",
                link: "/dashboard/download/transaction",
                icon: "dot"
            },
            {
                id: "unduh-data-perusahaan",
                title: "Unduh Data Perusahaan",
                name: "pusatunduhdata.unduhdataperusahaan",
                link: "/dashboard/download/company",
                icon: "dot"
            },
            {
                id: "unduh-data-mou",
                title: "Unduh Data MOU",
                name: "pusatunduhdata.unduhdatamou",
                link: "/dashboard/download/mou",
                icon: "dot"
            }
        ]
    }
];

export { sidebarStructure };
