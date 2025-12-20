import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Borrow } from "@/types/borrow";
import type { Fine } from "@/types/fine";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const API_URL = import.meta.env.VITE_API_URL;

const PatronBorrowPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  if (!userId) {
    return <div>Thiếu userId</div>;
  }

  return <UserDetailPage userId={Number(userId)} />;
};

export default PatronBorrowPage;

function UserDetailPage({ userId }: { userId: number }) {
  const [borrowings, setBorrowings] = useState<Borrow[]>([]);
  const [fines, setFines] = useState<Fine[]>([]);
  const [openReturnDialog, setOpenReturnDialog] = useState(false);
  const [returnStatus, setReturnStatus] = useState<
    "OK" | "HONG" | "MAT" | ""
  >("");
  const [selectedBorrow, setSelectedBorrow] = useState<Borrow | null>(null);
  const [openBorrowDialog, setOpenBorrowDialog] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [loadingBorrow, setLoadingBorrow] = useState(false);

  const authFetch = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    // 👉 Nếu backend trả 204
    if (res.status === 204) return null;

    // 👉 Nếu lỗi
    if (!res.ok) {
      let message = "Có lỗi xảy ra";

      try {
        const data = await res.json();
        message = data.error || data.message;
      } catch {
        message = await res.text();
      }

      throw new Error(`${res.status}: ${message}`);
    }

    return res.json();
  };

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const [borrowRes, fineRes] = await Promise.all([
          authFetch(`/api/borrow/user/${userId}`),
          authFetch(`/api/fine/user/${userId}/`),
        ]);

        setBorrowings(borrowRes);
        setFines(fineRes);
      } catch (err) {
        console.error(err);
        alert("Không thể tải dữ liệu");
      }
    };

    fetchData();
  }, [userId]);

  const handleBorrow = async () => {
    if (!barcode.trim()) {
      alert("Vui lòng nhập mã vạch");
      return;
    }

    try {
      setLoadingBorrow(true);

      const now = new Date();
      const ngayMuon = now.toISOString().split("T")[0];

      const ngayHetHan = new Date();
      ngayHetHan.setMonth(ngayHetHan.getMonth() + 1);
      const ngayHetHanStr = ngayHetHan.toISOString().split("T")[0];

      const formData = {
        doc_gia_id: userId,
        ma_vach: barcode,
        ngay_muon: ngayMuon,
        ngay_het_han: ngayHetHanStr,
      };

      await authFetch(`/staff/service/borrow`, {
        method: "POST",
        body: JSON.stringify(formData)
      });

      // reload danh sách mượn
      const borrowRes = await authFetch(`/api/borrow/user/${userId}`);
      setBorrowings(borrowRes);

      setBarcode("");
      setOpenBorrowDialog(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoadingBorrow(false);
    }
  };

  const handleReturn = async () => {
    if (!selectedBorrow) return;
    
    try {
      await authFetch(
        `/api/borrow/${selectedBorrow.id}/return`,
        {
          method: "PUT",
          body: JSON.stringify({
            tinh_trang: returnStatus,
          }),
        }
      );
    
      setBorrowings(prev =>
        prev.filter(b => b.id !== selectedBorrow.id)
      );
    
      const fineRes = await authFetch(
        `/api/fine/user/${userId}/`
      );
      setFines(fineRes);
    
      setOpenReturnDialog(false);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  const handlePayFine = async (fineId: number) => {
    if (!confirm("Xác nhận thu tiền phạt?")) return;

    try {
      await authFetch(`/api/fine/${fineId}/pay`, {
        method: "PUT",
      });

      setFines(prev =>
        prev.map(f =>
          f.id === fineId ? { ...f, da_thanh_toan: true } : f
        )
      );

      alert("Đã thu tiền phạt");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Chưa trả';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div id="webcrumbs">
      <Header/>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* ===== SÁCH ĐANG MƯỢN ===== */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              📚 Sách đang mượn
            </h2>
          </div>



          <div className="p-6">
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700 border-none"
                  onClick={() => setOpenBorrowDialog(true)}
                >
                  Thêm mượn
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-bold text-gray-700">Mã bản sao</TableHead>
                    <TableHead className="font-bold text-gray-700">Ngày mượn</TableHead>
                    <TableHead className="font-bold text-gray-700">Hạn trả</TableHead>
                    <TableHead className="font-bold text-gray-700">Trạng thái</TableHead>
                    <TableHead className="text-right font-bold text-gray-700">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {borrowings.length > 0 ? (
                    borrowings.map(b => (
                      <TableRow
                        key={b.id}
                        className="hover:bg-blue-50 transition-colors"
                      >
                        <TableCell className="font-medium">{b.ban_sao_id}</TableCell>
                        <TableCell>{formatDate(b.ngay_muon)}</TableCell>
                        <TableCell>{formatDate(b.ngay_het_han)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={b.tinh_trang === "CHUA_TRA" ? "destructive" : "secondary"}
                          >
                            {b.tinh_trang}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            className="bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => {
                              setSelectedBorrow(b);
                              setReturnStatus("");
                              setOpenReturnDialog(true);
                            }}
                          >
                            Trả sách
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-gray-500 py-8"
                      >
                        Không có sách đang mượn
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* ===== PHẠT ===== */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              💰 Phạt
            </h2>
          </div>

          <div className="p-6">
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-bold text-gray-700">Loại</TableHead>
                    <TableHead className="font-bold text-gray-700">Số tiền</TableHead>
                    <TableHead className="font-bold text-gray-700">Trạng thái</TableHead>
                    <TableHead className="text-right font-bold text-gray-700">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {fines.length > 0 ? (
                    fines.map(f => (
                      <TableRow
                        key={f.id}
                        className="hover:bg-red-50 transition-colors"
                      >
                        <TableCell>{f.loai}</TableCell>
                        <TableCell className="font-medium">
                          {f.so_tien.toLocaleString()} đ
                        </TableCell>
                        <TableCell>
                          {f.da_thanh_toan ? (
                            <Badge variant="secondary">Đã thanh toán</Badge>
                          ) : (
                            <Badge variant="destructive">Chưa thanh toán</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {!f.da_thanh_toan && (
                            <Button
                              size="sm"
                              className="bg-red-600 text-white hover:bg-red-700"
                              onClick={() => handlePayFine(f.id)}
                            >
                              Thu tiền
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center text-gray-500 py-8"
                      >
                        Không có phạt
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

      </main>
      <Dialog open={openReturnDialog} onOpenChange={setOpenReturnDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>📚 Trả sách</DialogTitle>
          </DialogHeader>
                      
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Vui lòng chọn tình trạng sách khi trả
            </p>
                      
            <RadioGroup
              value={returnStatus}
              onValueChange={(v) =>
                setReturnStatus(v as "OK" | "HONG" | "MAT")
              }
              className="space-y-3"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="OK" id="OK" />
                <Label htmlFor="OK">✅ Tốt</Label>
              </div>
            
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="HONG" id="HONG" />
                <Label htmlFor="HONG">❌ Hỏng</Label>
              </div>
            
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="MAT" id="MAT" />
                <Label htmlFor="MAT">🚫 Mất sách</Label>
              </div>
            </RadioGroup>
          </div>
            
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenReturnDialog(false)}
            >
              Hủy
            </Button>
            
            <Button
              disabled={!returnStatus || !selectedBorrow}
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleReturn}
            >
              Xác nhận trả
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openBorrowDialog} onOpenChange={setOpenBorrowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>📖 Thêm mượn sách</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Label htmlFor="barcode">Mã vạch sách</Label>
            <input
              id="barcode"
              autoFocus
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Quét hoặc nhập mã vạch"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenBorrowDialog(false)}
            >
              Hủy
            </Button>

            <Button
              disabled={loadingBorrow}
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={handleBorrow}
            >
              {loadingBorrow ? "Đang xử lý..." : "Xác nhận mượn"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      </div>
    </div>
  );

}
