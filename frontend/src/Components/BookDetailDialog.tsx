"use client";

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Author } from "@/types/author";
import type { Publisher } from "@/types/publisher";
import type { NumCopy } from "@/types/copy";
import type { Book } from "@/types/book";

interface BookDetailDialogProps {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (book: any) => void;
}

export default function BookDetailDialog({ book, open, onOpenChange, onAddToCart }: BookDetailDialogProps) {
  if (!book || !open) return null;
  const [author, setAuthor] = useState<Author | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [copies, setCopies] = useState<NumCopy | null>(null);

    // 🔥 Khi book thay đổi => gọi API
  useEffect(() => {
    if (!book) return;

    setAuthor(null);
    setPublisher(null);

    const fetchDetails = async () => {
      try {
        const [authorRes, publisherRes, copiesRes] = await Promise.all([
          fetch(`http://localhost:3001/api/author/${book.tacgia_id}`),
          fetch(`http://localhost:3001/api/publisher/${book.nxb_id}`),
          fetch(`http://localhost:3001/api/book/${book.id}/num_copies`),
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
                    <Label className="text-gray-600 text-sm font-medium">Tổng số bản sao</Label>
                    <p className="font-medium text-gray-900">{copies?.total_copies} bản</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-600 text-sm font-medium">Bản sao khả dụng</Label>
                    <p className="font-medium text-green-600">{copies?.available_copies} bản</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-600 text-sm font-medium">Trạng thái</Label>
                    <div>
                      {copies?.available_copies ? (
                        <Badge variant="outline" className="bg-red-100 text-red-800">
                          Hết sách
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Còn sách
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <Label className="text-gray-600 text-sm font-medium">Mô tả</Label>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{book.tom_tat}</p>
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
        <Button className="px-6 bg-blue-600 hover:bg-blue-700 text-white">
          Mượn sách
        </Button>
      </div>
      </div>
    </div>
  );
}
