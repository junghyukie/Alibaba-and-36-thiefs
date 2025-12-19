import React, { useEffect, useState } from "react";
import Header from "./Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const API_URL = import.meta.env.VITE_API_URL;

interface Fine {
  id: number;
  phieu_muon_id: number;
  doc_gia_id: number;
  loai: string;
  so_tien: number;
  mo_ta?: string;
  da_thanh_toan: boolean;
}

const FineHistoryUser: React.FC = () => {
  const [fines, setFines] = useState<Fine[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFines = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Vui lòng đăng nhập để xem thông tin phạt");
        return;
      }

      const res = await fetch(`${API_URL}/user/service/fines`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Không thể tải dữ liệu phạt");
      }

      const data = await res.json();
      setFines(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Lỗi kết nối đến server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFines();
  }, []);

  const filteredFines = fines.filter((f) =>
    f.loai.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUnpaid = fines
  .filter(f => !f.da_thanh_toan)
  .reduce((sum, f) => sum + f.so_tien, 0);

  const getStatusBadge = (da_thanh_toan: boolean) => {
    if (da_thanh_toan) {
      return (
        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
          Đã thanh toán
        </span>
      );
    }

    return (
      <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
        Chưa thanh toán
      </span>
    );
  };

  return (
    <div id="webcrumbs">
      <Header />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-6">
              <h1 className="text-3xl font-bold text-gray-800">
                Thông tin phạt
              </h1>
              <p className="text-gray-600 mt-2">
                Danh sách các khoản phạt của bạn
              </p>
            </div>

            <div className="p-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <Input
                  placeholder="Tìm kiếm theo loại phạt..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>

              {loading ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4">Đang tải dữ liệu...</p>
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-bold text-gray-700">
                          Loại phạt
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Số tiền
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Mô tả
                        </TableHead>
                        <TableHead className="font-bold text-gray-700">
                          Trạng thái
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFines.length > 0 ? (
                        <>
                          {filteredFines.map((fine) => (
                            <TableRow
                              key={fine.id}
                              className="hover:bg-blue-50 transition-colors"
                            >
                              <TableCell className="font-medium text-gray-900">
                                {fine.loai}
                              </TableCell>
                              <TableCell className="text-gray-700">
                                {fine.so_tien.toLocaleString()} đ
                              </TableCell>
                              <TableCell className="text-gray-600">
                                {fine.mo_ta || "—"}
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(fine.da_thanh_toan)}
                              </TableCell>
                            </TableRow>
                          ))}
                      
                          {/* ===== DÒNG TỔNG TIỀN ===== */}
                          <TableRow className="bg-gray-100 font-semibold">
                            <TableCell colSpan={3} className="text-right text-gray-800">
                              Tổng tiền cần thanh toán:
                            </TableCell>
                            <TableCell className="text-red-600">
                              {totalUnpaid.toLocaleString()} đ
                            </TableCell>
                          </TableRow>
                        </>
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                            Không có khoản phạt
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FineHistoryUser;
