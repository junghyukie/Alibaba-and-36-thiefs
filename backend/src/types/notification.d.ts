export interface notification{
    noi_dung : string;
    ngay_tao : Date;
}

export interface notificationResultService{
    data ?: notificationUser[];
    success : boolean;
    message? : string;
}

