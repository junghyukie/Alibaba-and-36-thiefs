import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const API_URL = import.meta.env.VITE_API_URL; 

interface BorrowRecord {
  sach_id: number;
  tieu_de: string;
  ngay_muon: string | null;
  ngay_het_han: string | null;
  ngay_tra: string | null;
} 

const BorrowHistoryUser: React.FC = () => {
  const [borrowHistory, setBorrowHistory] = useState<BorrowRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBorrowHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Vui lòng đăng nhập để xem lịch sử mượn sách');
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_URL}/user/service/log`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      
      console.log('Borrow history response:', data);
      
      if (data.success && data.data) {
        setBorrowHistory(data.data);
      } else {
        setError(data.message || 'Không thể tải lịch sử mượn sách');
      }
    } catch (err) {
      console.error('Error fetching borrow history:', err);
      setError('Lỗi kết nối đến server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowHistory();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Chưa trả';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const filteredHistory = borrowHistory.filter((record: BorrowRecord) =>
    record.tieu_de.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (ngay_het_han: string | null, ngay_tra: string | null) => {
    if (ngay_tra) {
      return (
        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
          Đã trả
        </span>
      );
    }

    if (!ngay_het_han) {
      return (
        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
          Không xác định
        </span>
      );
    }
      
    const today = new Date();
    const dueDate = new Date(ngay_het_han);
    
    if (today > dueDate) {
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
          Quá hạn
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
        Đang mượn
      </span>
    );
  };

  return (
    <div id="webcrumbs">
      <Header/>
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-6">
              <h1 className="text-3xl font-bold text-gray-800">Lịch sử mượn sách</h1>
              <p className="text-gray-600 mt-2">Xem tất cả các sách bạn đã mượn</p>
            </div>
            
            <div className="p-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <Input
                  placeholder="Tìm kiếm theo tên sách..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>

              {loading ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4">Đang tải dữ liệu...</p>
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="font-bold text-gray-700">Tên sách</TableHead>
                        <TableHead className="font-bold text-gray-700">Ngày mượn</TableHead>
                        <TableHead className="font-bold text-gray-700">Ngày hết hạn</TableHead>
                        <TableHead className="font-bold text-gray-700">Ngày trả</TableHead>
                        <TableHead className="font-bold text-gray-700">Trạng thái</TableHead>
                        <TableHead className="text-right font-bold text-gray-700">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHistory.length > 0 ? (
                        filteredHistory.map((record: BorrowRecord, index: number) => (
                          <TableRow key={index} className="hover:bg-blue-50 transition-colors">
                            <TableCell className="font-medium text-gray-900">{record.tieu_de}</TableCell>
                            <TableCell className="text-gray-600">{formatDate(record.ngay_muon)}</TableCell>
                            <TableCell className="text-gray-600">{formatDate(record.ngay_het_han)}</TableCell>
                            <TableCell className="text-gray-600">{formatDate(record.ngay_tra)}</TableCell>
                            <TableCell>{getStatusBadge(record.ngay_het_han, record.ngay_tra)}</TableCell>
                            <TableCell className="text-right">
                              {!record.ngay_tra && (
                                <Button
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded"
                                  onClick={async () => {
                                    const token = localStorage.getItem('token');
                                    if (!token) { alert('Vui lòng đăng nhập'); return; }
                                    try {
                                      const res = await fetch(`${API_URL}/user/service/extend-book`, {
                                        method: 'POST',
                                        headers: {
                                          'Authorization': `Bearer ${token}`,
                                          'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({ id: record.sach_id })
                                      });
                                      const data = await res.json();
                                      if (!res.ok) {
                                        alert(data.message || 'Gia hạn thất bại');
                                      } else {
                                        alert(data.message || 'Gia hạn thành công');
                                        fetchBorrowHistory();
                                      }
                                    } catch (err) {
                                      console.error('Error extending book:', err);
                                      alert('Lỗi kết nối khi gửi yêu cầu gia hạn');
                                    }
                                  }}
                                >
                                  Gia hạn mượn
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                            Không có lịch sử mượn sách
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BorrowHistoryUser;
