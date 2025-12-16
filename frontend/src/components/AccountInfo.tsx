import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_URL = import.meta.env.VITE_API_URL;

interface UserInfo {
  email: string
  ho_ten : string;
  ngay_sinh : string;
  dien_thoai: string;
  dia_chi : string;
  gioi_tinh : string;
}

// Giả lập dữ liệu (exported so other components can import)
const AccountInfo: React.FC = () => {

  const formatDateToVN = (isoDate?: string) => {
  if (!isoDate) return "";

  const date = new Date(isoDate);

  // Lấy ngày theo timezone Việt Nam (trình duyệt tự xử lý)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

  const navigate = useNavigate();
  // Khởi tạo state với giá trị rỗng
  const [form, setForm] = useState<UserInfo>({
    email: "", ho_ten: "", ngay_sinh: "", dien_thoai: "", dia_chi: "", gioi_tinh: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        alert("Bạn chưa đăng nhập. Đang chuyển hướng...");
        navigate("/login");
        return;
      }

      // Kiểm tra xem có đang xem thông tin độc giả khác không
      const viewingPatronData = localStorage.getItem('viewingPatron');
      if (viewingPatronData) {
        try {
          const patronInfo = JSON.parse(viewingPatronData);
          setForm({
            email: patronInfo.email || "",
            ho_ten: patronInfo.ho_ten || "",
            ngay_sinh: patronInfo.ngay_sinh || "",
            dien_thoai: patronInfo.dien_thoai || "",
            dia_chi: patronInfo.dia_chi || "",
            gioi_tinh: patronInfo.gioi_tinh || ""
          });
          setLoading(false);
          // Xóa dữ liệu sau khi đã load
          localStorage.removeItem('viewingPatron');
          return;
        } catch (err) {
          console.error("Lỗi parse dữ liệu độc giả:", err);
          localStorage.removeItem('viewingPatron');
        }
      }
      
      // BƯỚC QUAN TRỌNG: Gọi API tới Server để lấy dữ liệu profile
      try {
        const res = await fetch(`${API_URL}/api/auth/user-info`, { 
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            // Đính kèm token vào Header Authorization theo chuẩn Bearer
            "Authorization": `Bearer ${token}` 
          },
        });

        if (res.status === 401) {
            alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            localStorage.removeItem("token");
            navigate("/login");
            return;
        }

        if (!res.ok) {
          throw new Error("Lỗi khi tải thông tin người dùng.");
        }

        const dataWrapper = await res.json(); 
        const data = dataWrapper.data;
        
        if (dataWrapper.success && data) {
            // Cập nhật state với dữ liệu nhận được từ Server, đảm bảo luôn là chuỗi
            setForm({
                email: data.email || "",
                ho_ten: data.ho_ten || "",
                ngay_sinh: formatDateToVN(data.ngay_sinh) || "",
                dien_thoai: data.dien_thoai || "",
                dia_chi: data.dia_chi || "",
                gioi_tinh: data.gioi_tinh || ""
            });
        } else {
            // Xử lý trường hợp Server trả về success=false hoặc data=null
            throw new Error("Dữ liệu hồ sơ không hợp lệ hoặc rỗng.");
        }

      } catch (err) {
        console.error(err);
        alert("Không thể kết nối hoặc tải dữ liệu hồ sơ.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]); // navigate là dependency để tránh warning

   if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <span className="text-muted-foreground">Đang tải thông tin...</span>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Page */}
      <main className="min-h-screen bg-[url('https://images2.alphacoders.com/104/1042582.jpg')] bg-cover bg-center px-4 py-10">
        <div className="mx-auto max-w-md">
          
          <Card className="h-[85vh] max-h-[750px] flex flex-col">
            
            {/* Card Header */}
            <CardHeader>
              <CardTitle className="text-center text-2xl text-blue-900">
                Thông tin tài khoản
              </CardTitle>
            </CardHeader>

            {/* Scroll content */}
            <CardContent className="flex-1 overflow-y-auto space-y-6 px-4">
              
              <Field label="Email">
                <Input value={form.email} readOnly />
              </Field>

              <Field label="Mật khẩu">
                <Input value="********" readOnly type="password" />
              </Field>

              <Field label="Họ và tên">
                <Input value={form.ho_ten} readOnly />
              </Field>

              <Field label="Giới tính">
                <Input value={form.gioi_tinh} readOnly />
              </Field>

              <Field label="Số điện thoại">
                <Input value={form.dien_thoai} readOnly />
              </Field>

              <Field label="Ngày sinh">
                <Input type="date" value={form.ngay_sinh} readOnly />
              </Field>

              <Field label="Địa chỉ">
                <Input value={form.dia_chi} readOnly />
              </Field>

            </CardContent>

            {/* Footer */}
            <CardFooter className="flex flex-col gap-3">
              <Button
                className="w-full"
                onClick={() => navigate("/password-change")}
              >
                Thay đổi mật khẩu
              </Button>
              <Button
                className="w-full"
                onClick={() => navigate("/personal-info-insert")}
              >
                Thay đổi thông tin
              </Button>
            </CardFooter>

          </Card>
        </div>
      </main>
    </>
  );
};

export default AccountInfo;

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-muted-foreground">
      {label}
    </label>
    {children}
  </div>
);