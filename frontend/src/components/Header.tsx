import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Home, Bell, BookOpen, LogOut, User } from "lucide-react";
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL;

interface DecodedToken {
  id_acc: number;
  vai_tro: string;
}

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState<Array<{noi_dung: string; ngay_tao: string}>>([]);
  const [notificationCount, setNotificationCount] = useState(0);

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
/*
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
*/
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

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const endpoint = isStaff 
        ? `${API_URL}/staff/service/notifications`
        : `${API_URL}/user/service/notifications`;

      const res = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      
      if (data.success && data.data) {
        setNotifications(data.data);
        setNotificationCount(data.data.length);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const toggleNotifications = () => {
    if (!isNotificationOpen && notifications.length === 0) {
      fetchNotifications();
    }
    setIsNotificationOpen(!isNotificationOpen);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            {/* Leaderboard button - hiện cho tất cả mọi người */}
            <Button onClick={() => navigate('/top-books')} className="bg-purple-600 text-white hover:bg-purple-700 border-none">
              📊 Leaderboard
            </Button>
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
            {isLoggedIn && (
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleNotifications}
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </Button>

                {isNotificationOpen && (
                  <div
                    className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-96 overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-4 py-3 border-b bg-gray-50">
                      <h3 className="font-semibold text-gray-800">Thông báo</h3>
                    </div>
                    {notifications.length > 0 ? (
                      <div className="divide-y">
                        {notifications.map((notif, index) => (
                          <div key={index} className="px-4 py-3 hover:bg-gray-50 transition">
                            <p className="text-sm text-gray-800 mb-1">{notif.noi_dung}</p>
                            <p className="text-xs text-gray-500">{formatDate(notif.ngay_tao)}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-8 text-center text-gray-500">
                        <Bell className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                        <p>Không có thông báo mới</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
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