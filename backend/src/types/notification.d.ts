export interface notification{
    id: number;
    noi_dung : string;
    ngay_tao : Date;
    da_doc?: boolean;
}

export interface notificationResultService{
    data ?: notification[];
    success : boolean;
    message? : string;
}

