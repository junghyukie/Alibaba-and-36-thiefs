"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Author } from "@/types/author";
import type { Publisher } from "@/types/publisher";
import type { NumCopy } from "@/types/copy";
import type { Book } from "@/types/book";
const API_URL = import.meta.env.VITE_API_URL;

interface BookDetailDialogProps {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (book: any) => void;
  onhandleBorrow :  (book : any) => void;

}


export default function BookDetailDialog({ book, open, onOpenChange, onAddToCart,onhandleBorrow  }: BookDetailDialogProps) {
  if (!book || !open) return null;
  const [author, setAuthor] = useState<Author | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [copies, setCopies] = useState<NumCopy | null>(null);
  const [showReservationDialog, setShowReservationDialog] = useState(false);

    // 🔥 Khi book thay đổi => gọi API
  useEffect(() => {
    if (!book) return;

    setAuthor(null);
    setPublisher(null);

    const fetchDetails = async () => {
      try {
        const [authorRes, publisherRes, copiesRes] = await Promise.all([
          fetch(`${API_URL}/api/author/${book.tacgia_id}`),
          fetch(`${API_URL}/api/publisher/${book.nxb_id}`),
          fetch(`${API_URL}/api/book/${book.id}/num_copies`),
        ]);

        if (!authorRes.ok || !publisherRes.ok || !copiesRes.ok) {
          throw new Error("API response not ok");
        }

        const authorData = await authorRes.json();
        const publisherData = await publisherRes.json();
        const copiesData = await copiesRes.json();

        setAuthor(authorData);
        setPublisher(publisherData);
        setCopies(copiesData);

      } catch (err) {
        console.error("Lỗi fetch:", err);
      }
    };


    fetchDetails();
  }, [book]);

  // Function to reserve a book when unavailable
  const handleReserveBook = async () => {
    if (!book) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vui lòng đăng nhập để đặt sách!');
      return;
    }

    const formData = {
      id_sach: book.id,
    };

    try {
      console.log('📤 Gửi yêu cầu đặt sách:', formData);

      const res = await fetch(`${API_URL}/user/service/reserve-book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert('❌ Lỗi: ' + (data.message || 'Không thể đặt sách'));
        return;
      }

      alert('✅ ' + (data.message || 'Đặt sách thành công!'));
      setShowReservationDialog(false);
      onOpenChange(false);
    } catch (err: any) {
      console.error('❌ Lỗi khi gửi yêu cầu đặt sách:', err);
      alert('Có lỗi xảy ra khi đặt sách!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50" 
        onClick={() => onOpenChange(false)}
      />
      
      {/* Dialog Content */}
      <div className="relative z-50 w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-start justify-between rounded-t-lg">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{book.tieu_de}</h2>
            <p className="text-base text-gray-700 mt-2">
              by {author?.ten} • {publisher?.ten}
            </p>
          </div>
          <button 
            onClick={() => onOpenChange(false)}
            className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="p-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button className="py-2 px-1 border-b-2 border-blue-500 text-blue-600 font-medium text-sm">
                Thông tin
              </button>
            </nav>
          </div>

          {/* Tab Content - Thông tin */}
          <div className="mt-6">
            <Card className="bg-white border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Thông tin cơ bản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-600 text-sm font-medium">Mã ISBN</Label>
                    <p className="font-medium text-gray-900">{book.isbn}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-600 text-sm font-medium">Tác giả</Label>
                    <p className="font-medium text-gray-900">{author?.ten}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-600 text-sm font-medium">Nhà xuất bản</Label>
                    <p className="font-medium text-gray-900">{publisher?.ten}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-600 text-sm font-medium">Thể loại</Label>
                    <div className="flex gap-2">
                      {book.the_loai?.map(c => (
                        <Badge key={c.id} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {c.ten}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-600 text-sm font-medium">Trạng thái</Label>
                    <div>
                      {copies?.available_copies && copies.available_copies > 0 ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Còn sách
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-100 text-red-800">
                          Hết sách
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <Label className="text-gray-600 text-sm font-medium">Mô tả</Label>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{book.tom_tat}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-6 flex justify-end gap-3 rounded-b-lg">
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Đóng
        </Button>
        <Button
          className="px-6 bg-green-600 hover:bg-green-700 text-white"
          onClick={() => {
            onAddToCart(book);
            onOpenChange(false); // Optional: close dialog after adding
          }}
        >
          Thêm vào giỏ hàng
        </Button>
        <Button className="px-6 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                onhandleBorrow(book);
             // Optional: close dialog after adding
          }}
          >
          Mượn sách
        </Button>
      </div>
      </div>

            {/* Reservation Dialog */}
      {showReservationDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowReservationDialog(false)} />
          <div className="relative z-50 w-full max-w-md bg-white rounded-lg shadow-xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sách không còn bản sao khả dụng</h2>
            <p className="text-gray-600 mb-6">
              Sách <strong>{book.tieu_de}</strong> hiện không còn bản sao khả dụng. Bạn có muốn đặt sách để được thông báo khi có bản sao sẵn sàng không?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowReservationDialog(false)}
                className="px-6"
              >
                Hủy
              </Button>
              <Button
                className="px-6 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleReserveBook}
              >
                Đặt sách
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
