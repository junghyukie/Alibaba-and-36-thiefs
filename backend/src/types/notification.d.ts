export interface notification{
    noi_dung : string;
    ngay_tao : Date;
    da_doc : boolean;
}

export interface notificationResultService{
    data ?: notificationUser[];
    success : boolean;
    message? : string;
}

