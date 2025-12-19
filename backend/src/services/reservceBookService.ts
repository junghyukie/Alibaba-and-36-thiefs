import pool from "../config/db";
import { createNotification, selectExpired, deleteFromQueue, reorderQueue, moveNextUser, insertQueue, convertMaintenancetoAvailable, convertReservedtoAvailable } from "../models/reserveBookModel";

export class ReservationService {

    /**
     * Thêm user vào hàng đợi
     */
    static async addToQueue(tai_khoan_id: number, sach_id: number) {
        // Lấy số thứ tự hiện tại
        const sqlStt = `SELECT MAX(stt) as max_stt FROM dat_cho WHERE sach_id = $1`;
        const res = await pool.query(sqlStt, [sach_id]);
        const stt = (res.rows[0]?.max_stt ?? 0) + 1;

        const sqlInsert = await insertQueue(tai_khoan_id, sach_id, stt);
        if (sqlInsert > 0) {
            console.log("Thêm vào bảng dat_cho thành công");
            return { success: true };

        }
        else {
            console.log("Thêm vào bảng dat_cho thất bại");
            return { success: false };
        }
    }

    /**
     * Gán bản sao cho người đầu tiên trong queue
     */
    static async assignBook(sach_id: number, ban_sao_id: number) {
        const firstUser = await moveNextUser(sach_id, ban_sao_id);
        if (!firstUser) return null;

        const resSach = await pool.query(
            `SELECT tieu_de FROM sach WHERE id = $1`,
            [sach_id]
        );

        const tenSach = resSach.rows[0]?.tieu_de || "sách";

        // Tạo notification
        await createNotification(
            firstUser.tai_khoan_id,
            "DEN_LUOT_DAT_CHO",
            `Đến lượt bạn mượn sách ${tenSach}. Thời gian giữ 15 phút.`
        );

        return firstUser;
    }

    /**
     * Xử lý user quá hạn
     */
    static async handleExpired(sach_id: number) {
        const expiredUsers = await selectExpired(sach_id);

        const resSach = await pool.query(
            `SELECT tieu_de FROM sach WHERE id = $1`,
            [sach_id]
        );
        const tenSach = resSach.rows[0]?.tieu_de || "sách";
        for (const user of expiredUsers) {
            // Xóa khỏi queue
            await deleteFromQueue(user.tai_khoan_id, sach_id);

            // Giảm thứ tự cho các user còn lại
            await reorderQueue(sach_id);

            // Tạo notification hết hạn
            await createNotification(
                user.tai_khoan_id,
                "QUA_HAN_DAT_CHO",
                `Bạn đã hết hạn giữ sách ${tenSach}.`
            );

            // Gọi người tiếp theo nếu có bản sao
            if (user.ban_sao_id) {
                await this.assignBook(sach_id, user.ban_sao_id);
            }
        }
    }

    static async convert() {
        const result = await convertReservedtoAvailable();
        const result2 = await convertMaintenancetoAvailable();
    }

    /**
     * Cron job hoặc gọi sau khi trả sách
     */
    static async processQueue(sach_id: number, ban_sao_id?: number) {
        // 1. Xử lý người hết hạn
        await this.handleExpired(sach_id);

        // 2. Nếu có bản sao rảnh thì gán luôn
        if (ban_sao_id) {
            await this.assignBook(sach_id, ban_sao_id);
        }
    }


}
