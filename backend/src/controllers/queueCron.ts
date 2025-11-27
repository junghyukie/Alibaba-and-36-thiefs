import pool from "../config/db";
import { ReservationService } from "../services/reservceBookService";

/**
 * Cron job: kiểm tra sách TRONG_KHO và queue để gán cho người đầu tiên
 */
const processQueueCron = async () => {
    try {
        // 1.Lấy tất cả sách có queue
        const resQueue = await pool.query(`SELECT DISTINCT sach_id FROM dat_cho`);
        const sachIds = resQueue.rows.map(r => r.sach_id);

        for (const sach_id of sachIds) {
            // 2.Xử lý người quá hạn
            await ReservationService.handleExpired(sach_id);

            
            // 3.Kiểm tra có bản sao TRONG_KHO không
            const resBanSao = await pool.query(
                `SELECT id FROM ban_sao WHERE sach_id = $1 AND trang_thai = 'MAINTENANCE'`,
                [sach_id]
            );

            for (const ban_sao of resBanSao.rows) {
                // 4.Gán bản sao cho người đầu tiên trong queue
               const result = await ReservationService.assignBook(sach_id, ban_sao.id);
                if(result === null) break;
                // 5️.Cập nhật bản sao sang trạng thái 'DA_DUOC_CHON' tạm thời
                await pool.query(
                    `UPDATE ban_sao SET trang_thai = 'RESERVED' WHERE id = $1`,
                    [ban_sao.id]
                );
            }
        }

        await ReservationService.convert();
        
        console.log("✅ Cron job xử lý queue xong");
    } catch (err) {
        console.error("❌ Cron job lỗi:", err);
    }
};
processQueueCron();
// Chạy cron mỗi phút
setInterval(processQueueCron, 60 * 1000);

