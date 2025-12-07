// hooks/useUser.ts

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { jwtDecode } from "jwt-decode"; 
const API_URL = import.meta.env.VITE_API_URL;

// 1. Định nghĩa Interface cho dữ liệu User (Đã đồng bộ với Backend)
interface UserInfo {
    email: string;
    ho_ten: string;
    ngay_sinh: string;
    dien_thoai: string;
    dia_chi: string;
    gioi_tinh: string;
}

// Định nghĩa Interface cho Payload của Token
//interface DecodedToken {
//    id_acc: number;
//    vai_tro: string;
//    // ... các trường khác (iat, exp)
//    [key: string]: any;
//}

// 2. Định nghĩa Custom Hook
export const useUser = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            
            if (!token) {
                // Nếu không có token, không cần gọi API
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            try {
                // BƯỚC 1: Gọi API
                const res = await fetch(`${API_URL}/api/auth/user-info`, { 
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    },
                });

                if (res.status === 401) {
                    // Xử lý lỗi xác thực (Token hết hạn/không hợp lệ)
                    localStorage.removeItem("token");
                    setIsAuthenticated(false);
                    // navigate("/login"); // Có thể chuyển hướng ở đây hoặc để component gọi hook xử lý
                    return; 
                }

                if (!res.ok) {
                    throw new Error("Lỗi Server khi tải thông tin người dùng.");
                }

                const dataWrapper = await res.json(); 
                
                // BƯỚC 2: Trích xuất và lưu dữ liệu (Đã có email, ho_ten, v.v. từ Server)
                if (dataWrapper.success && dataWrapper.data) {
                    const backendData = dataWrapper.data; 
                    
                    setUserInfo({
                        email: backendData.email || "", 
                        ho_ten: backendData.ho_ten || "",
                        ngay_sinh: backendData.ngay_sinh || "",
                        dien_thoai: backendData.dien_thoai || "",
                        dia_chi: backendData.dia_chi || "",
                        gioi_tinh: backendData.gioi_tinh || "",
                    });
                    setIsAuthenticated(true);
                }

            } catch (err) {
                console.error("Lỗi khi fetch user info:", err);
                setUserInfo(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserInfo();
    }, [navigate]); 
    // Thêm token vào dependency nếu bạn muốn hook tự động tải lại khi token thay đổi (ví dụ: đăng nhập)
    // }, [navigate, localStorage.getItem("token")]); 

    return { userInfo, isLoading, isAuthenticated, setUserInfo };
};

export default useUser;