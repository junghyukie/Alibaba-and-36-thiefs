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
    sach_id: number;
    tieu_de : string;
    ngay_muon : Date | null;
    ngay_het_han : Date | null;
    ngay_tra : Date | null;
}

export interface logServiceResult{
    success: boolean;
    data?: logResults[];
    message?: string;
}
