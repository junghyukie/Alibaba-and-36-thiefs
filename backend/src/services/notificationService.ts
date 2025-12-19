
import { notifyUserSachSapHetHan, notifyStaffSachQuaHan,notifyUserSachQuaHan,
    notifyStaffAccChuaKichHoat,notifyStaffTheQuaHan,notifyUserTheSapHetHan
 } from "../models/notificationModel";

export const runNotificationService = async () => {
  await Promise.all([
    notifyUserSachSapHetHan(),
    notifyUserSachQuaHan(),
    notifyStaffSachQuaHan(),
    notifyUserTheSapHetHan(),
    notifyStaffTheQuaHan(),
    notifyStaffAccChuaKichHoat(),
  ]);
};
