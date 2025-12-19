
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const API_URL = import.meta.env.VITE_API_URL;

type Notification = {
  noi_dung: string;
  ngay_tao: string;
};

const NotificationListUser: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Vui lòng đăng nhập để xem thông báo");
        return;
      }

      const res = await fetch(`http://localhost:3001/user/service/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success && data.data) {
        setNotifications(data.data);
      } else {
        setError(data.message || "Không thể tải thông báo");
      }
    } catch (err) {
      console.error(err);
      setError("Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString("vi-VN");
  };

  return (
    <>
      <Header onSearch={() => {}} />

      <div className="min-h-screen bg-gray-50 px-6 py-8">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b bg-blue-50 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              🔔 Thông báo hệ thống
            </h1>
          </div>

          <div className="p-6">
            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-center py-10 text-gray-500">
                Đang tải thông báo...
              </div>
            ) : (
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="font-bold">Nội dung</TableHead>
                      <TableHead className="w-[180px] font-bold">
                        Thời gian
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {notifications.length > 0 ? (
                      notifications.map((n, index) => (
                        <TableRow key={index} className="hover:bg-blue-50">
                          <TableCell className="text-gray-800">
                            {n.noi_dung}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {formatDateTime(n.ngay_tao)}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          className="text-center text-gray-500 py-8"
                        >
                          Không có thông báo nào
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationListUser;
