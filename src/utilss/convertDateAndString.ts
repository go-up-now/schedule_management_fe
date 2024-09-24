import moment from 'moment';

// export const convertToDateObject = (displayDateTime: string): Date => {
//     return moment(displayDateTime, 'DD/MM/YYYY - hh:mm A').toDate();
// };
// hiển thị có kèm AM PM
export const convertToDisplayFormat = (dateTime: Date): string => {
    return moment(dateTime, "DD/MM/YYYY HH:mm:ss").format('DD/MM/YYYY - hh:mm A');
};
//Calendar
export const formattedSelectedDate = (date: Date) => {
    return moment(date, "YYYY-MM-DD").format('DD/MM/YYYY');
};
// post/ put về server
export const formatDateForBackend = (date: Date) => {
    return moment(date).format("DD/MM/YYYY HH:mm:ss");
};
// export const convertToDateOnly = (dateTimeStr: Date) => {
//     return moment(dateTimeStr).format('YYYY-MM-DD');
// };
//thẻ input 
export const formatDateForInput = (date: Date) => {
    if (!date) return '';
    return moment(date, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DDTHH:mm")
};

export const formatDateNotTimeForInput = (date: Date) => {
    if (!date) return '';
    return moment(date, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD")
};


export const convertToDisplayFormatDDMMYYY = (dateTime: Date): string => {
    return moment(dateTime, "DD/MM/YYYY HH:mm:ss").format('DD/MM/YYYY');
};
export const formatDateForBackendDDMMYYY = (date: string) => {
    return moment(date, "YYYY-MM-DD").format('DD/MM/YYYY');
};
export const parseDate = (dateString: string) => {
    return moment(dateString, 'DD/MM/YYYY').toDate();
};

// Chuyển đổi string 26/07/2024 17:00:00 thành chuỗi định dạng ISO 8601 2024-08-16T10:00:00+07:00 
export function convertToISO8601(input: string): string {
    function parseDate(input: string): Date {
        const [day, month, year, hour, minute, second] = input
            .split(/[/ :]/)
            .map(Number);
        return new Date(year, month - 1, day, hour, minute, second);
    }
    const date = parseDate(input);
    return date.toISOString().replace('Z', '+07:00');
}