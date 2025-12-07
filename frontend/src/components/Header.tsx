import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { SearchBar } from './SearchBar';
import { Home, Bell, BookOpen, LogOut, User } from "lucide-react";

const Header = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleHome = () => {
    navigate('/');
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

          {/* Search Bar */}
          <SearchBar onSearch={onSearch}/>

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
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            
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