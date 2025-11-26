"use client";

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

// Define cart item type
type CartItem = {
  id: string;
  title: string;
  author: string;
  // Add other book properties you need
};

// 1. Import tất cả component cần thiết từ shadcn/ui và lucide-react
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Heart, Search, BookOpen, LogOut, User, ShoppingCart } from "lucide-react";
import BookDetailDialog from "./BookDetailDialog";

// Dữ liệu mẫu cho các cuốn sách
const books = [
  { id: 5, title: "The Midnight Library", author: "Matt Haig", publisher: "Penguin Random House", status: "New", statusVariant: "default" as const, tags: ["Fiction", "Fantasy"], copies: 12, availableCopies: 8, gradient: "from-purple-400 to-indigo-600", emoji: "📖", rating: 4.5, reviews: 234, description: "A dazzling novel about all the choices that go into a life well lived." },
  { id: 6, title: "Project Hail Mary", author: "Andy Weir", publisher: "Ballantine Books", status: "Popular", statusVariant: "secondary" as const, tags: ["Sci-Fi", "Adventure"], copies: 8, availableCopies: 2, gradient: "from-blue-400 to-cyan-600", emoji: "🚀", rating: 4.8, reviews: 456, description: "A lone astronaut must save the earth from disaster." },
  { id: 7, title: "Atomic Habits", author: "James Clear", publisher: "Avery Publishing", status: null, tags: ["Self-Help", "Productivity"], copies: 5, availableCopies: 5, gradient: "from-green-400 to-emerald-600", emoji: "💡", rating: 4.7, reviews: 892, description: "An easy way to build good habits and break bad ones." },
];

// Danh sách các thể loại
const categories = ["Fantasy", "Sci-Fi", "Mystery", "Romance", "Biography", "Horror", "Historical"];

export default function Component() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  // Function to add book to cart
  // const addToCart = (book: any) => {
  //   // Check if book already exists in cart
  //   const exists = cartItems.find(item => item.id === book.id);
  //   if (!exists) {
  //     setCartItems([...cartItems, book]);
  //   }
  // };

  // Function to add book to cart
  const addToCart = async (book: any) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập trước khi thêm vào giỏ hàng!");
      navigate("/login");
      return;
    }

    // Dữ liệu gửi lên server
    const formData = {
      id_sach: book.id,
      so_luong: 1
    };

    try {
      console.log("📦 GỬI YÊU CẦU THÊM VÀO GIỎ HÀNG:", formData);

      const res = await fetch("http://localhost:3001/user/service/insert-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("❌ Lỗi: " + (data.message || "Không thể thêm vào giỏ hàng"));
        return;
      }

      alert("✅ " + (data.message || "Đã thêm vào giỏ hàng!"));

      // Thêm vào giỏ hàng local (frontend)
      const exists = cartItems.find(item => item.id === book.id);
      if (!exists) {
        setCartItems([...cartItems, book]);
      }
    } catch (error) {
      console.error("🚨 Lỗi khi gửi yêu cầu thêm vào giỏ hàng:", error);
      alert("Có lỗi xảy ra khi thêm vào giỏ hàng!");
    }
  };

  const [hasFetchedCart, setHasFetchedCart] = useState(false);

  const toggleCart = async () => {
    if (!isCartOpen) {
      // Nếu chưa fetch lần nào, lấy dữ liệu từ server
      if (!hasFetchedCart) {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Vui lòng đăng nhập để xem giỏ hàng!");
          navigate("/login");
          return;
        }

        try {
          const res = await fetch("http://localhost:3001/user/service/cart-items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });

          const data = await res.json();

          if (!res.ok) {
            alert("❌ Lỗi khi lấy giỏ hàng: " + (data.message || ""));
            return;
          }

          // Lưu vào state và localStorage
          setCartItems(data || []);
          localStorage.setItem("cartItems", JSON.stringify(data || []));
          setHasFetchedCart(true);

        } catch (error) {
          console.error("Lỗi khi fetch cart:", error);
          alert("Có lỗi xảy ra khi lấy giỏ hàng!");
        }
      } else {
        // Nếu đã fetch rồi, lấy từ localStorage
        const savedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
        setCartItems(savedCart);
      }
    }

    setIsCartOpen(!isCartOpen);
  };

  // Function to remove from cart
  const removeFromCart = (bookId: string) => {
    setCartItems(cartItems.filter(item => item.id !== bookId));
  };

  // Function to open book dialog from cart
  const openBookFromCart = (book: any) => {
    setSelectedBook(book);
    setIsDialogOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");       // Xoá token
    localStorage.removeItem("cartItems");   // Xoá giỏ hàng trong localStorage
    setCartItems([]);                       // Xoá giỏ hàng trong state
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  const handleLogin = () => {
    // This would navigate to Login.tsx file
    navigate('/login');
  };

  const handleAccount = () => {
    // This would navigate to AccountInfo.tsx file
    navigate('/accinfo');
  }

  const handleHome = () => {
    navigate('/');
  }


  return (
    <div id="webcrumbs" className="bg-muted/40 min-h-screen">
      <header className="bg-background shadow-sm sticky top-0 z-10 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <button onClick={handleHome} className="p-2 hover:bg-gray-100 rounded">
              <Home className="h-6 w-6 text-primary" />
            </button>

            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary">
                Alibaba and 36 Thiefs
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
                      // close when clicking outside
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Account button */}
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleAccount();               // calls your function
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 rounded-t-md transition"
                      >
                        <User className="h-4 w-4" />
                        Account
                      </button>

                      {/* Logout button */}
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600 rounded-b-md transition"
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

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Library Collection
            </h2>
            <p className="text-muted-foreground mt-1">
              Browse our extensive collection of books
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent
                className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-gray-950 shadow-md"
                position="popper"
              >
                <SelectItem value="all" className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100">
                  All Categories
                </SelectItem>
                <SelectItem value="fiction" className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100">
                  Fiction
                </SelectItem>
                <SelectItem value="fantasy" className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100">
                  Fantasy
                </SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent
                className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 text-gray-950 shadow-md"
                position="popper"
              >
                <SelectItem value="newest" className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100">
                  Newest First
                </SelectItem>
                <SelectItem value="oldest" className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100">
                  Oldest First
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <RadioGroup
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="flex flex-wrap gap-x-4 gap-y-2 mb-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="r-all" />
            <Label htmlFor="r-all">All Books</Label>
          </div>
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <RadioGroupItem value={category.toLowerCase()} id={`r-${category.toLowerCase()}`} />
              <Label htmlFor={`r-${category.toLowerCase()}`}>{category}</Label>
            </div>
          ))}
        </RadioGroup>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`relative h-48 bg-gradient-to-br ${book.gradient} flex items-center justify-center`}>
                <span className="text-6xl">{book.emoji}</span>
                <Button variant="secondary" size="icon" className="absolute top-2 right-2 h-8 w-8 rounded-full">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{book.title}</CardTitle>
                  {book.status && <Badge variant={book.statusVariant}>{book.status}</Badge>}
                </div>
                <p className="text-sm text-muted-foreground pt-1 !mt-0">by {book.author}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {book.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{book.copies}</span> copies available
                </div>
                <Button size="sm" onClick={() => { setSelectedBook(book); setIsDialogOpen(true); }}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <BookDetailDialog
        book={selectedBook}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddToCart={addToCart}
      />

      <button
        onClick={toggleCart}
        className="fixed bottom-4 left-4 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors duration-200 flex items-center gap-2"
        aria-label="Toggle cart"
      >
        <ShoppingCart size={24} />
        <span className="font-medium">Cart</span>
      </button>

      {isCartOpen && (
  <>
    {/* Backdrop mờ */}
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 z-40"
      onClick={() => setIsCartOpen(false)}
    />

    {/* Cửa sổ giỏ hàng - căn giữa */}
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()} // Ngăn đóng khi click vào giỏ hàng
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-bold">Giỏ hàng của bạn</h3>
          <button 
            onClick={() => setIsCartOpen(false)} 
            className="text-2xl text-gray-500 hover:text-gray-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Nội dung giỏ hàng - có thể cuộn */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Giỏ hàng trống</p>
              <p className="text-sm text-gray-400 mt-2">Hãy thêm sách bạn thích nhé!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl p-4 hover:bg-gray-50 cursor-pointer transition-all group relative"
                  onClick={() => {
                    openBookFromCart(item);
                    setIsCartOpen(false);
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromCart(item.id);
                    }}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity text-xl"
                  >
                    ✕
                  </button>
                  <h4 className="font-semibold text-lg pr-8">{item.title}</h4>
                  <p className="text-gray-600">{item.author}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer (tùy chọn thêm nút thanh toán sau) */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Mượn sách ({cartItems.length} sách)
            </button>
          </div>
        )}
      </div>
    </div>
  </>
)}
