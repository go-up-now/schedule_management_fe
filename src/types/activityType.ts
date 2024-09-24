
export enum ActivityStatus {
    NORMAL = 'NORMAL',
    CANCEL = 'CANCEL',
}
export interface Activity {
    id: number;
    name: string;
    joinMark?: number;
    hostMark?: number;
    beginTime?: Date | string;
    endTime?: Date | string;
    place?: string;
    image?: string;
    qrCode?: string;
    date?: Date;
    describe?: string;
    typeId?: number;
    block?: number;
    slot?: number,
    semester?: string;
    year?: number;
    activityStatus?: ActivityStatus; // Updated to use enum
    status?: boolean;
}
export const DEFAULT_IMAGE_CHUYEN_MON = "https://res.cloudinary.com/dexpqpnyh/image/authent…20k%E1%BA%BF%20ch%C6%B0a%20c%C3%B3%20t%C3%AAn.png";
export const DEFAULT_IMAGE_NGOAI_KHOA = "https://res.cloudinary.com/dexpqpnyh/image/authenticated/s--aHIcXNA_--/v1723974000/FTT%20%281%29.png";
export interface ActivityType {
    id: number;
    name: string;

}

export interface JoinDTO {
    activityId: number;
    instructorId: number;
    ishost: boolean;

}