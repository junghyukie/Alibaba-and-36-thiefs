import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";import { Badge } from '@/components/ui/badge';import { Home, Bell, BookOpen, LogOut, User } from "lucide-react";
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id_acc: number;
  vai_tro: string;
}

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState<{ id: number; noi_dung: string; ngay_tao: string; da_doc?: boolean }[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [notifLoading, setNotifLoading] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // State để lưu vai trò đã được giải mã
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Giải mã token để lấy payload
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUserRole(decodedToken.vai_tro);
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
        // Xử lý nếu token không hợp lệ
        setUserRole(null);
      }
    }

    // Fetch notifications on mount if logged in
    fetchNotifications();

  }, []); // Chỉ chạy một lần khi component mount

  // Kiểm tra vai trò
  const isStaff = userRole === 'NHAN_VIEN';

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleHome = () => {
    navigate('/');
  };

  // Notifications API
  const fetchNotifications = async () => {
    setNotifLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/service/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotifications(data.data || []);
        const unread = (data.data || []).filter((n: any) => !n.da_doc).length;
        setUnreadCount(unread);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setNotifLoading(false);
    }
  };

  const markAllNotificationsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) { alert('Vui lòng đăng nhập'); return; }
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/service/notifications/mark-read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ markAll: true })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // mark locally
        setNotifications(prev => prev.map(n => ({ ...n, da_doc: true })));
        setUnreadCount(0);
        alert('Đã đánh dấu tất cả thông báo là đã đọc');
      } else {
        alert(data.message || 'Không thể đánh dấu đã đọc');
      }
    } catch (err) {
      console.error('Error marking notifications read:', err);
      alert('Lỗi khi đánh dấu thông báo đã đọc');
    }
  };

  const markNotificationRead = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) { alert('Vui lòng đăng nhập'); return; }
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/service/notifications/mark-read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ids: [id] })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, da_doc: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
      } else {
        alert(data.message || 'Không thể đánh dấu đã đọc');
      }
    } catch (err) {
      console.error('Error marking notification read:', err);
      alert('Lỗi khi đánh dấu thông báo đã đọc');
    }
  };

  const handleAccount = () => {
    navigate('/accinfo');
    setIsDropdownOpen(false);
  };

  const handleLibraryCard = () => {
    navigate('/librarycard');
    setIsDropdownOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleBorrowHistory = () => {
    navigate('/history-user');
    setIsDropdownOpen(false);
  }

  const handleFineHistory = () => {
    navigate('/user/fines');
    setIsDropdownOpen(false);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  return (
    <header 
      className="bg-background shadow-sm sticky top-0 z-10 border-b"
      style={{
        display: 'flex !important' as any,
        flexDirection: 'row !important' as any,
        width: '100%'
      }}
    >
      <div 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          display: 'flex !important' as any,
          flexDirection: 'row !important' as any,
          width: '100%'
        }}
      >
        <div 
          className="flex items-center justify-between h-16"
          style={{
            display: 'flex !important' as any,
            flexDirection: 'row !important' as any,
            alignItems: 'center !important' as any,
            justifyContent: 'space-between !important' as any,
            width: '100%',
            minHeight: '64px'
          }}
        >
          {/* Home Button */}
          <button 
            onClick={handleHome} 
            className="p-2 hover:bg-gray-100 rounded"
            style={{
              display: 'flex !important' as any,
              flexShrink: 0
            }}
          >
            <Home className="h-6 w-6 text-primary" />
          </button>

          {/* Patron List Button (navigates to '/patronlist') and Book List Button (navigates to '/booklist') that is only visible if token.vai_tro = 'NHAN_VIEN'*/}
          <div className="flex items-center gap-2">
            {isStaff && (
              <>
                <Button onClick={() => navigate('/patronlist')} className="bg-blue-600 text-white hover:bg-blue-700 border-none">
                  Quản lý độc giả
                </Button>
                <Button onClick={() => navigate('/booklist')} className="bg-blue-600 text-white hover:bg-blue-700 border-none">
                  Quản lý sách
                </Button>
              </>
            )}
          </div>

          {/* Logo */}
          <div 
            className="flex items-center gap-2"
            style={{
              display: 'flex !important' as any,
              flexDirection: 'row !important' as any,
              alignItems: 'center !important' as any,
              gap: '0.5rem',
              flexShrink: 0
            }}
          >
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">
              Alibaba and 36 Thieves
            </h1>
          </div>

          {/* Right Section - Notifications & User */}
          <div 
            className="flex items-center space-x-4"
            style={{
              display: 'flex !important' as any,
              flexDirection: 'row !important' as any,
              alignItems: 'center !important' as any,
              gap: '1rem',
              flexShrink: 0
            }}
          >
            <div className="relative">
              <button onClick={() => { setIsNotifOpen(!isNotifOpen); if (!isNotifOpen) fetchNotifications(); }} className="relative p-2 hover:bg-gray-100 rounded">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">{unreadCount}</span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                  <div className="flex items-center justify-between px-3 py-2 border-b">
                    <strong>Thông báo</strong>
                    <button onClick={markAllNotificationsRead} className="text-sm text-blue-600">Đánh dấu tất cả</button>
                  </div>
                  <div className="max-h-64 overflow-auto">
                    {notifLoading ? (
                      <div className="p-3">Đang tải...</div>
                    ) : notifications.length === 0 ? (
                      <div className="p-3">Không có thông báo</div>
                    ) : (
                      notifications.map((n) => (
                        <div key={n.id} className="px-3 py-2 border-b hover:bg-gray-50 flex justify-between items-start">
                          <div className="mr-2" onClick={() => { if (!n.da_doc) markNotificationRead(n.id); }}>
                            <div className="text-sm">{n.noi_dung}</div>
                            <div className="text-xs text-gray-400">{new Date(n.ngay_tao).toLocaleString()}</div>
                          </div>
                          {!n.da_doc && (
                            <button onClick={(e) => { e.stopPropagation(); markNotificationRead(n.id); }} className="text-xs text-green-600">Đánh dấu</button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="hover:opacity-75 transition-opacity"
                >
                  <Avatar>
                    <AvatarFallback>GU</AvatarFallback>
                  </Avatar>
                </button>
                
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: 'flex !important' as any,
                      flexDirection: 'column !important' as any
                    }}
                  >
                    <button
                      onClick={handleAccount}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 rounded-t-md transition"
                      style={{
                        display: 'flex !important' as any,
                        flexDirection: 'row !important' as any
                      }}
                    >
                      <User className="h-4 w-4" />
                      Account
                    </button>

                    <button
                      onClick={handleLibraryCard}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition"
                      style={{
                        display: 'flex !important' as any,
                        flexDirection: 'row !important' as any
                      }}
                    >
                      <BookOpen className="h-4 w-4" />
                      Library Card
                    </button>

                    <button
                      onClick={handleBorrowHistory}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition"
                      style={{
                        display: 'flex !important' as any,
                        flexDirection: 'row !important' as any
                      }}
                    >
                      <BookOpen className="h-4 w-4" />
                      Borrow History
                    </button>

                    <button
                      onClick={handleFineHistory}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition"
                      style={{
                        display: 'flex !important' as any,
                        flexDirection: 'row !important' as any
                      }}
                    >
                      <BookOpen className="h-4 w-4" />
                      Công nợ
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600 rounded-b-md transition"
                      style={{
                        display: 'flex !important' as any,
                        flexDirection: 'row !important' as any
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button onClick={handleLogin} size="sm">
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;