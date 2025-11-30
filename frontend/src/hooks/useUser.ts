// hooks/useUser.ts (Tạo file này)
import { useState, useEffect } from 'react';
import { getEmailFromToken } from '../types/auth'; 
// Import các types cần thiết

const useUser = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            // Logic fetch API tương tự như trong useEffect của bạn
            // ...
            // Khi thành công:
            // setUserInfo({ ... dữ liệu đã map ... }); 
            // setIsLoading(false);
        };
        fetchUserData();
    }, []);

    return { userInfo, isLoading };
};

export default useUser;