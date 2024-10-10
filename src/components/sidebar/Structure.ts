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
        name: "list",
        parent: true,
        icon: "list",
        child: [
            {
                id: "student",
                title: "Sinh viên",
                name: "list.student",
                link: "/sinh-vien",
                icon: "dot"
            },
            {
                id: "instructor",
                title: "Quotation",
                name: "list.instructor",
                link: "/giang-vien",
                icon: "dot",
            },
            {
                id: "purchase-request",
                title: "Purchase Request",
                name: "list.transaksi.pr",
                link: "/purchase-request",
                icon: "dot"
            },
            {
                id: "purchase-order",
                title: "Purchase Order",
                name: "list.transaksi.po",
                link: "/purchase-order",
                icon: "dot"
            }
        ]
    },
    {
        id: "schedule",
        title: "Lịch học",
        name: "schedule",
        parent: true,
        icon: "perusahaan",
        child: [
            {
                id: "course-registration",
                title: "Đăng ký môn học",
                name: "schedule.course-registration",
                link: "/dang-ky-mon-hoc",
                icon: "dot"
            },
            {
                id: "schedule-child",
                title: "Lịch học",
                name: "schedule.schedule-child",
                link: "/lich-hoc",
                icon: "dot"
            },
            {
                id: "exam-schedule",
                title: "Lịch thi",
                name: "schedule.exam-schedule",
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
