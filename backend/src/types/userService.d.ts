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

export interface Ban_sao {
    id_ban_sao : number
    id_sach : number;
    ma_vach : string;       
    trang_thai: string;
    gia_tri : number;
    ke_sach : string;
}