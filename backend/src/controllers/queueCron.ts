import pool from "../config/db";
import { theConHanModel, theQuaHanModel } from "../models/CardModel";
import { ReservationService } from "../services/reservceBookService";
import { activeAccService, lockAccService } from "../services/staffService";
import { runNotificationService } from "../services/notificationService";
/**
 * Cron job: kiểm tra sách TRONG_KHO và queue để gán cho người đầu tiên
 */
const processQueueCron = async () => {
    try {
        // 1.Kiểm tra bảng dat_cho có tồn tại không
        const tableCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'dat_cho'
            );
        `);
        
        if (!tableCheck.rows[0].exists) {
            console.log("⚠️ Bảng 'dat_cho' chưa tồn tại, bỏ qua cron job");
            return;
        }

        // 2.Lấy tất cả sách có queue
        const resQueue = await pool.query(`SELECT DISTINCT sach_id FROM dat_cho`);
        const sachIds = resQueue.rows.map(r => r.sach_id);

        for (const sach_id of sachIds) {
            // 3.Xử lý người quá hạn
            await ReservationService.handleExpired(sach_id);

            
            // 4.Kiểm tra có bản sao TRONG_KHO không
            const resBanSao = await pool.query(
                `SELECT id FROM ban_sao WHERE sach_id = $1 AND trang_thai = 'AVAILABLE'`,
                [sach_id]
            );

            for (const ban_sao of resBanSao.rows) {
                // 5.Gán bản sao cho người đầu tiên trong queue
               const result = await ReservationService.assignBook(sach_id, ban_sao.id);
                if(result === null) break;
                // 6.Cập nhật bản sao sang trạng thái 'DA_DUOC_CHON' tạm thời
                await pool.query(
                    `UPDATE ban_sao SET trang_thai = 'RESERVED' WHERE id = $1`,
                    [ban_sao.id]
                );
            }
        }

        await ReservationService.convert();

        const id_the_qua_han = await theQuaHanModel();
        for(const id of id_the_qua_han){
            await lockAccService(id);
        }

        const id_the_con_han = await theConHanModel();
        for(const id of id_the_con_han){
            await activeAccService(id);
        }
        
        await runNotificationService();

        console.log("✅ Cron job xử lý queue xong");
    } catch (err) {
        console.error("❌ Cron job lỗi:", err);
    }
};
processQueueCron();
// Chạy cron mỗi phút
setInterval(processQueueCron, 60 * 1000);

