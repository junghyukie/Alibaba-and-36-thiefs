import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Bell, Search, BookOpen, LogOut, User } from "lucide-react";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleLogout = () => {
    setIsDropdownOpen(false);
    // TODO: Add logout logic here
    navigate('/login');
  };

  return (
    <header className="bg-background shadow-sm sticky top-0 z-10 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <button onClick={handleHome} className="p-2 hover:bg-gray-100 rounded">
            <Home className="h-6 w-6 text-primary" />
          </button>

          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">
              Alibaba and 36 Thieves
            </h1>
          </div>

          <div className="relative flex-1 max-w-sm hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search books, authors..."
              className="pl-8 w-full"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
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
                >
                  <button
                    onClick={handleAccount}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 rounded-t-md transition"
                  >
                    <User className="h-4 w-4" />
                    Account
                  </button>

                  <button
                    onClick={handleLibraryCard}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 transition"
                  >
                    <BookOpen className="h-4 w-4" />
                    Library Card
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600 rounded-b-md transition"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
