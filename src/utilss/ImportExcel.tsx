import * as xlsx from 'xlsx';
import { toast } from 'react-toastify';

export const handleFileUpload = (file1, importExcelAPI, getAllObject,
    setListAPI, setList, setListActivity, setListUnActivity,
    setIsReLoadTable, isReLoadTable, disable = false, isUser = false
) => {

    const file = file1;
    const reader = new FileReader();

    reader.onload = async (event) => {
        const workbook = xlsx.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = xlsx.utils.sheet_to_json(sheet);

        // Tổ chức lại dữ liệu để phù hợp với backend
        let formattedData;
        if (isUser) {
            formattedData = sheetData.map(item => ({
                education_program: item.education_program,
                enterSchool: item.enterSchool,
                semester: item.semester,
                year: item.year,
                user: {
                    code: item.code,
                    lastName: item.lastName,
                    firstName: item.firstName,
                    email: item.email,
                    password: item.password,
                    gender: item.gender,
                    phone: item.phone,
                    birthday: item.birthday,
                    address: item.address,
                    area: item.area
                }
            }));
        }

        // Gửi dữ liệu lên server
        try {
            const response = await importExcelAPI(formattedData ? formattedData : sheetData);
            if (response && response.data) {
                if (response.data.code === 999) {
                    toast.error('Import excel không thành công! Vui lòng kiểm tra lại')
                }
                else if (response.data.code !== 200) {
                    toast.error(response.data.message)
                }
            }
            else if (response && response.code === 200) {
                toast.success("Import excel thành công")
                let responseAll = await getAllObject();
                console.log("res", responseAll)
                setListAPI(responseAll.data)
                setList(responseAll.data)

                if (isUser) {
                    const active = responseAll.data.filter(item => item.user.status);
                    setListActivity(active);
                }
                else {
                    const active = responseAll.data.filter(item => item.activityStatus === 'Đang hoạt động');
                    setListActivity(active);
                    const unActiveClazz = responseAll.data.filter(item => item.activityStatus === 'Chưa hoạt động');
                    setListUnActivity(unActiveClazz);
                }

                setIsReLoadTable(!isReLoadTable);
            }
        } catch (error) {
            console.log(error);
            toast.error("Import excel không thành công! Vui lòng kiểm tra lại")
        }
    };

    reader.readAsBinaryString(file);
};
