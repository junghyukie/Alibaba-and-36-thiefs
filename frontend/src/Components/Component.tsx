"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define cart item type
type CartItem = {
  id: string;
  title: string;
  author: string;
  // Add other book properties you need
};

// 1. Import tất cả component cần thiết từ shadcn/ui và lucide-react
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import BookDetailDialog from "./BookDetailDialog";
import Header from "./Header";
import type { Book } from "@/types/book";
import CategorySelector from "./CategorySelector";
import type { Category } from "@/types/category";

export default function Component() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCats, setSelectedCats] = useState<number[]>([]);

  // Gọi API lấy sách theo filter
  const fetchBooks = async () => {
    const params = new URLSearchParams({
      search: query,
      page: page.toString(),
    });
    if (selectedCats.length > 0) {
      params.append("the_loai", selectedCats.join(","));
    }
    const res = await fetch(`http://localhost:3001/api/book?${params}&limit=6`);
    const data = await res.json();

    setBooks(data.data);
    setPage(data.currentPage);
    setTotalPages(data.totalPages);
  };

  const handleSearch = (searchText: string) => {
    setQuery(searchText);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  useEffect(() => {
    fetchBooks();
  }, [page, query, selectedCats]);

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3001/api/category");
    const data = await res.json();
    setCategories(data);
  };

  const handleToggleCat = (id: number, checked: boolean) => {
    setSelectedCats((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
    setPage(1);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [selectedBook, setSelectedBook] = useState<Book|null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('cartItems');
      if (raw) return JSON.parse(raw) as CartItem[];
    } catch (e) {
      // ignore parse errors
    }
    return [];
  });

  // Persist cart to localStorage so other pages/components can read it
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

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

  
const handleBorrow = async (book : any) => {
  if (!book) return;

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Vui lòng đăng nhập trước khi mượn sách!");
    return;
  }

  const now = new Date();
  const ngayMuon = now.toISOString().split("T")[0];

  const ngayHetHan = new Date();
  ngayHetHan.setMonth(ngayHetHan.getMonth() + 1); // 1 tháng sau
  const ngayHetHanStr = ngayHetHan.toISOString().split("T")[0];

  const formData = {
    id_sach: book.id,
    so_luong: 1,
    ngay_muon: ngayMuon,
    ngay_het_han: ngayHetHanStr,
  };

  try {
    console.log("📤 Gửi yêu cầu mượn sách:", formData);

    const res = await fetch("http://localhost:3001/user/service/borrow-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
    }
    else {
      alert("✅ " + (data.message || "Đã thêm vào giỏ hàng!"));
    }

   // postMessage("✅ Mượn sách thành công!");
  } catch (err: any) {
    console.error("❌ Lỗi khi gửi dữ liệu:", err);
    //postMessage("❌ Có lỗi xảy ra: " + (err.message || "Lỗi không xác định"));
  }
};
  return (
    <div id="webcrumbs" className="bg-muted/40 min-h-screen">
      <Header onSearch={handleSearch} />

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
        </div>

        <CategorySelector
          categories={categories}
          selected={selectedCats}
          onChange={handleToggleCat}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`relative h-48 bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center`}>
                <span className="text-6xl">📚</span>
                <Button variant="secondary" size="icon" className="absolute top-2 right-2 h-8 w-8 rounded-full">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{book.tieu_de}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {book.the_loai?.map(c => <Badge key={c.id} variant="outline">{c.ten}</Badge>)}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
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
        onhandleBorrow={handleBorrow}
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
        <div className="fixed bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-[600px] max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">Cart</h3>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

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
      )}
      <div className="flex justify-center items-center gap-3 mt-6">
        <Button onClick={handlePrev} disabled={page <= 1}>Prev</Button>
        <span>{page} / {totalPages}</span>
        <Button onClick={handleNext} disabled={page >= totalPages}>Next</Button>
      </div>
    </div>
  );
}
