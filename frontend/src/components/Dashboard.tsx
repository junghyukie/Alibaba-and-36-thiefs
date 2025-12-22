"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

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
import { SearchBar } from "./SearchBar";
import type { CartItem } from "@/types/userService";

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
    const res = await fetch(`${API_URL}/api/book?${params}&limit=6`);
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
    const res = await fetch(`${API_URL}/api/category`);
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCartIds, setSelectedCartIds] = useState<number[]>([]);

  const toggleCart = async () => {
    if (!isCartOpen) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vui lòng đăng nhập!");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/user/service/cart-items`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data: CartItem[] = await res.json();
        if (!res.ok) throw new Error("Fetch cart failed");

        setCartItems(data);
        localStorage.setItem("cartItems", JSON.stringify(data));
      } catch (err) {
        alert("Không thể tải giỏ hàng");
      }
    }

    setIsCartOpen(!isCartOpen);
  };

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

      const res = await fetch(`${API_URL}/user/service/insert-book`, {
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
      const exists = cartItems.find(item => item.id_sach === book.id);
      if (!exists) {
        // Normalize the book data to ensure title/author fields exist
        const normalizedBook: CartItem = {
          id_sach: book.id,
          title: book.title,
          author: book.author
        };
        setCartItems([...cartItems, normalizedBook]);
      }
    } catch (error) {
      console.error("🚨 Lỗi khi gửi yêu cầu thêm vào giỏ hàng:", error);
      alert("Có lỗi xảy ra khi thêm vào giỏ hàng!");
    }
  };

  const removeFromCart = async (id_sach: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch(`${API_URL}/user/service/delete-book/${id_sach}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setCartItems((prev) => prev.filter((i) => i.id_sach !== id_sach));
    setSelectedCartIds((prev) => prev.filter((id) => id !== id_sach));
  };

  // Function to open book dialog from cart
  const openBookFromCart = (book: any) => {
    setSelectedBook(book);
    setIsDialogOpen(true);
  };

const handleBorrow = async (book_id: number) => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Vui lòng đăng nhập trước khi mượn sách!");
    return;
  }

  const now = new Date();
  const ngayMuon = now.toISOString().split("T")[0];

  const ngayHetHan = new Date();
  ngayHetHan.setMonth(ngayHetHan.getMonth() + 1);
  const ngayHetHanStr = ngayHetHan.toISOString().split("T")[0];

  const formData = {
    id_sach: book_id,
    so_luong: 1,
    ngay_muon: ngayMuon,
    ngay_het_han: ngayHetHanStr,
  };

  try {
    console.log("📤 Gửi yêu cầu mượn sách:", formData);

    const res = await fetch(`${API_URL}/user/service/borrow-book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorMsg = data.message || "Lỗi không xác định";
      
      // Check if the error is "Không còn bản sao khả dụng"
      if (errorMsg.includes("Không còn bản sao khả dụng")) {
        console.log("📚 Sách không khả dụng, mở dialog đặt sách");
        // Trigger the reservation dialog by setting state
        // We need to pass this event back to the parent - use a callback or state
        // For now, alert and suggest reservation
        const reserveNow = confirm(
          `${errorMsg}\n\nBạn có muốn đặt sách để được thông báo khi có bản sao sẵn sàng không?`
        );
        if (reserveNow) {
          await reserveBook(book_id);
        }
      } else {
        alert("❌ Lỗi: " + errorMsg);
      }
      return;
    }
    else
      alert("✅ " + (data.message || "Mượn sách thành công!"));
  } catch (err: any) {
    console.error("❌ Lỗi khi gửi dữ liệu:", err);
    alert("Có lỗi xảy ra khi mượn sách!");
  }
};

// Helper function to reserve a book
const reserveBook = async (book_id: number) => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Vui lòng đăng nhập!");
    return;
  }

  const formData = {
    sach_id: book_id,
  };

  try {
    console.log("📤 Gửi yêu cầu đặt sách:", formData);

    const res = await fetch(`${API_URL}/user/service/reserve-book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("❌ Lỗi: " + (data.message || "Không thể đặt sách"));
      return;
    }

    alert("✅ " + (data.message || "Đặt sách thành công!"));
  } catch (err: any) {
    console.error("❌ Lỗi khi gửi yêu cầu đặt sách:", err);
    alert("Có lỗi xảy ra khi đặt sách!");
  }
};

// Borrow all selected books from cart
  const borrowSelected = async () => {
    if (selectedCartIds.length === 0) {
      alert("Vui lòng chọn sách");
      return;
    }

    for (const id_sach of selectedCartIds) {
      await handleBorrow(id_sach); // number
      await removeFromCart(id_sach);
    }

    setSelectedCartIds([]);
    setIsCartOpen(false);
  };

  return (
    <div 
      id="webcrumbs" 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ 
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url('/img/background.jpg')` 
      }}
    >
      <Header/>

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
          <SearchBar
            onSearch={handleSearch}
          />
        </div>

        <CategorySelector
          categories={categories}
          selected={selectedCats}
          onChange={handleToggleCat}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden bg-slate-100">
                {/* Book Image */}
                <img
                  src={`/img/${book.id}.webp`}
                  alt={book.tieu_de}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  // Fallback if image doesn't exist
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/400x600?text=No+Cover";
                  }}
                />

                {/* Wishlist Button Overlay */}
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <CardHeader>
                <CardTitle className="line-clamp-1">{book.tieu_de}</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2 mb-2">
                  {book.the_loai?.map(c => (
                    <Badge key={c.id} variant="secondary" className="bg-emerald-50 text-emerald-700 border-none">
                      {c.ten}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-colors text-white shadow-sm" 
                  size="sm" 
                  onClick={() => { setSelectedBook(book); setIsDialogOpen(true); }}
                >
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
                  key={item.id_sach}
                  className="border rounded-xl p-4 hover:bg-gray-50 cursor-pointer transition-all group relative"
                  onClick={() => {
                    openBookFromCart(item);
                    setIsCartOpen(false);
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Some backend payloads use different id fields (id, id_sach, ID, ma_sach).
                      // Resolve the most likely id value to avoid sending `undefined` to the API.
                      const resolvedId = (item as any).id ?? (item as any).id_sach ?? (item as any).ID ?? (item as any).ma_sach;
                      removeFromCart(resolvedId);
                    }}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity text-xl"
                    aria-label={`Remove ${item.title}`}
                  >
                    ✕
                  </button>

                  {/* Checkbox for selecting item - stop propagation so it doesn't open the item */}
                  <label className="absolute top-3 right-10" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedCartIds.includes(item.id_sach)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                      
                        setSelectedCartIds((prev) =>
                          checked
                            ? prev.includes(item.id_sach)
                              ? prev
                              : [...prev, item.id_sach]
                            : prev.filter((id) => id !== item.id_sach)
                        );
                      }}
                    />
                  </label>

                  <h4 className="font-semibold text-lg pr-8">{item.title}</h4>
                  <p className="text-gray-600">{item.author}</p>
                </div>
              ))}

              {/* Bulk borrow button - visible when there are items */}
              <div className="mt-4 border-t pt-4">
                <button
                  onClick={borrowSelected}
                  className="w-full bg-green-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
                >
                  Xác nhận mượn sách ({selectedCartIds.length} được chọn)
                </button>
              </div>
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
