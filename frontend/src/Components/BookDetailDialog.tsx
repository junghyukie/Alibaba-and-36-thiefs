"use client";

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
import { Star, AlertCircle, X } from "lucide-react";

// Dữ liệu mẫu - sau này sẽ fetch từ API
const borrowRecords = [
  { id: "BR001", userId: "U123", userName: "Nguyễn Văn A", cardId: "LC001", borrowDate: "2025-10-01", returnDate: "2025-10-15", copies: 1, fine: 0, status: "Active" },
  { id: "BR002", userId: "U456", userName: "Trần Thị B", cardId: "LC002", borrowDate: "2025-09-20", returnDate: "2025-10-04", copies: 1, fine: 15000, status: "Overdue" },
];

const bookings = [
  { id: "BG001", userId: "U789", userName: "Lê Văn C", cardId: "LC003", bookingDate: "2025-10-05", expiryDate: "2025-10-12", status: "Pending" },
  { id: "BG002", userId: "U234", userName: "Phạm Thị D", cardId: "LC004", bookingDate: "2025-10-06", expiryDate: "2025-10-13", status: "Ready" },
];

const complaints = [
  { id: "CP001", userId: "U123", userName: "Nguyễn Văn A", issue: "Sách bị rách trang 45", date: "2025-10-03", status: "Resolved" },
  { id: "CP002", userId: "U567", userName: "Hoàng Văn E", issue: "Không tìm thấy sách trên kệ", date: "2025-10-05", status: "Pending" },
];

interface BookDetailDialogProps {
  book: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (book: any) => void;
  onhandleBorrow :  (book : any) => void;

}


export default function BookDetailDialog({ book, open, onOpenChange, onAddToCart,onhandleBorrow  }: BookDetailDialogProps) {
  if (!book || !open) return null;

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
            <h2 className="text-2xl font-bold text-gray-900">{book.title}</h2>
            <p className="text-base text-gray-700 mt-2">
              by {book.author} • {book.publisher}
            </p>
          </div>
          <div className={`w-20 h-20 rounded-lg bg-gradient-to-br ${book.gradient} flex items-center justify-center text-3xl flex-shrink-0 ml-4`}>
            {book.emoji}
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
              <button className="py-2 px-1 text-gray-500 hover:text-gray-700 font-medium text-sm">
                Phiếu mượn
              </button>
              <button className="py-2 px-1 text-gray-500 hover:text-gray-700 font-medium text-sm">
                Đặt sách
              </button>
              <button className="py-2 px-1 text-gray-500 hover:text-gray-700 font-medium text-sm">
                Khiếu nại
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
                    <Label className="text-gray-600 text-sm font-medium">Mã sách</Label>
                    <p className="font-medium text-gray-900">{book.id}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-600 text-sm font-medium">Tác giả</Label>
                    <p className="font-medium text-gray-900">{book.author}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-600 text-sm font-medium">Nhà xuất bản</Label>
                    <p className="font-medium text-gray-900">{book.publisher}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-600 text-sm font-medium">Thể loại</Label>
                    <div className="flex gap-2">
                      {book.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-600 text-sm font-medium">Tổng số bản sao</Label>
                    <p className="font-medium text-gray-900">{book.copies} bản</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-600 text-sm font-medium">Bản sao khả dụng</Label>
                    <p className="font-medium text-green-600">{book.availableCopies} bản</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-600 text-sm font-medium">Trạng thái</Label>
                    <div>
                      {book.status ? (
                        <Badge variant={book.statusVariant} className="bg-green-100 text-green-800">
                          {book.status}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800">
                          Available
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-600 text-sm font-medium">Đánh giá</Label>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(book.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {book.rating || 0} ({book.reviews || 0} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <Label className="text-gray-600 text-sm font-medium">Mô tả</Label>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{book.description}</p>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6 space-y-4">
                  <Label className="text-gray-900 font-medium">Cài đặt sách</Label>
                  <div className="flex items-center justify-between py-3">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-normal text-gray-900">Cho phép mượn</Label>
                      <p className="text-xs text-gray-600">Độc giả có thể mượn sách này</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-normal text-gray-900">Cho phép đặt trước</Label>
                      <p className="text-xs text-gray-600">Độc giả có thể đặt trước sách này</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-normal text-gray-900">Hiển thị công khai</Label>
                      <p className="text-xs text-gray-600">Hiển thị trong danh mục tìm kiếm</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
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
    </div>
  );
}
