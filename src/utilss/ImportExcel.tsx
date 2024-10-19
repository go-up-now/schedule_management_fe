import * as xlsx from 'xlsx';
import { toast } from 'react-toastify';

export const handleFileUpload = (file1, importExcelAPI, getAllObjectAPI, setListObject1, setListObject2, setListActivityObject, setIsReLoadTable, isReLoadTable, disable = false) => {

    const file = file1;
    const reader = new FileReader();

    reader.onload = async (event) => {
        const workbook = xlsx.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = xlsx.utils.sheet_to_json(sheet);

        // Tổ chức lại dữ liệu để phù hợp với backend
        const formattedData = sheetData.map(item => ({
            education_program: item.education_program_code,
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

        // Gửi dữ liệu lên server
        try {
            const response = await importExcelAPI(formattedData);
            if (response && response.data) {
                if (response.data.code === 999) {
                    toast.error('Import excel sinh viên không thành công! Vui lòng kiểm tra lại')
                }
                else if (response.data.code !== 200) {
                    toast.error(response.data.message)
                }
            }
            else if (response && response.code === 200) {
                toast.success("Import excel sinh viên thành công")
                let responseAllStudents = await getAllObjectAPI();
                setListObject1(responseAllStudents.data)
                setListObject2(responseAllStudents.data)
                const activeStudents = responseAllStudents.data.filter(item => item.user.status);
                setListActivityObject(activeStudents);

                setIsReLoadTable(!isReLoadTable);
            }
        } catch (error) {
            console.log(error);
            toast.error("Import excel sinh viên không thành công! Vui lòng kiểm tra lại")
        }
    };

    reader.readAsBinaryString(file);
};
