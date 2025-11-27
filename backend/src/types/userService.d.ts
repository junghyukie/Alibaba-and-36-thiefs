export interface insertBook{
    id_sach : number;
    so_luong : number;
}

export interface borrowBook{
    id_sach: number;
    so_luong : number;
    //id_ban_sao : number;
    ngay_muon : Date;
    ngay_het_han: Date;
}

export interface cartItems{
    id_sach: number;
    title : string;
    author : string;
}

export interface logResults{
    tieu_de : string;
    ngay_muọn : Date;
    ngay_het_han : Date;
    ngay_tra : Date;
}

export interface logServiceResult{
    success: boolean;
    data?: logResults[];
    message?: string;
}
