import React, { useEffect, useState, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Book } from '../types/book';
import type { Copy } from '../types/copy';

const API_URL = import.meta.env.VITE_API_URL;
const PAGE_SIZE = 20;

type ListBookResult = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: Book[];
};

export default function BookList(): JSX.Element {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Detail view
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  // Copies state
  const [copies, setCopies] = useState<Copy[]>([]);
  const [copiesLoading, setCopiesLoading] = useState(false);
  const [copiesError, setCopiesError] = useState<string | null>(null);

  // Copy details modal
  const [selectedCopy, setSelectedCopy] = useState<Copy | null>(null);

  const navigate = useNavigate();

  const formatDate = (d?: string) => (d ? new Date(d).toLocaleDateString('vi-VN') : 'N/A');

  const fetchBooks = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', String(PAGE_SIZE));
      if (searchTerm) params.set('search', searchTerm);

      const res = await fetch(`${API_URL}/api/book?${params.toString()}`);
      const data: ListBookResult = await res.json();

      if (!res.ok) {
        setError(data && (data as any).message ? (data as any).message : 'Không thể tải danh sách sách');
        return;
      }

      setBooks(data.data || []);
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Lỗi kết nối đến server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Search handler
  const handleSearch = () => {
    fetchBooks(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    fetchBooks(page);
  };

const handleDeleteBook = async (bookId: number) => {
  const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sách này?");
  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/book/${bookId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 🔥 BẮT BUỘC kiểm tra
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Xóa sách thất bại");
    }

    // OK
    setBooks(prev => prev.filter(b => b.id !== bookId));
    alert("Xóa sách thành công");

  } catch (err: any) {
    alert(err.message || "Không thể xóa sách");
  }
};


  // Open detail view for a book (fetch full book and its copies)
  const openBookDetails = async (bookId: number) => {
    setSelectedBook(null);
    setDetailError(null);
    setDetailLoading(true);
    setCopies([]);
    setSelectedCopy(null);

    try {
      const res = await fetch(`${API_URL}/api/book/${bookId}`);
      const bookData: Book = await res.json();

      if (!res.ok) {
        setDetailError((bookData as any).message || 'Không thể lấy thông tin sách');
        return;
      }

      setSelectedBook(bookData);
    } catch (err) {
      console.error('Error fetching book details:', err);
      setDetailError('Lỗi kết nối đến server');
    } finally {
      setDetailLoading(false);
    }

    // Fetch copies
    setCopiesLoading(true);
    setCopiesError(null);
    try {
      const resC = await fetch(`${API_URL}/api/book/${bookId}/copies`);
      const copiesData: Copy[] = await resC.json();
      if (!resC.ok) {
        setCopiesError((copiesData as any).message || 'Không thể tải bản sao');
        setCopies([]);
      } else {
        setCopies(copiesData || []);
      }
    } catch (err) {
      console.error('Error fetching copies:', err);
      setCopiesError('Lỗi kết nối khi lấy bản sao');
    } finally {
      setCopiesLoading(false);
    }
  };

  const closeDetails = () => {
    setSelectedBook(null);
    setCopies([]);
    setSelectedCopy(null);
    setDetailError(null);
    setCopiesError(null);
  };

  return (
    <div id="webcrumbs">
      <Header/>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">Quản lý sách</h1>
              {!selectedBook && (
                <div className="flex items-center gap-3">
                  <Input
                    placeholder="Tìm kiếm theo tiêu đề..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                  />
                  <Button onClick={() => handleSearch()} className="bg-blue-600 text-white hover:bg-blue-700 border-none">Tìm</Button>
                </div>
              )}
            </div>

            <div className="p-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {/* Master View */}
              {!selectedBook && (
                <>
                  {loading ? (
                    <div className="text-center py-12 text-gray-500">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-4">Đang tải dữ liệu...</p>
                    </div>
                  ) : (
                    <>
                      <div className="rounded-lg border border-gray-200 overflow-hidden">
                        {/*a button that navigates to addbook right above the table*/}
                        <div className="p-4 bg-gray-50 border-b">
                          <Button onClick={() => navigate('/addbook')} className="bg-blue-600 text-white hover:bg-blue-700 border-none">
                            Thêm sách mới
                          </Button>
                        </div>
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-50 hover:bg-gray-50">
                              <TableHead className="w-[80px] font-bold text-gray-700">ID</TableHead>
                              <TableHead className="font-bold text-gray-700">Tiêu đề</TableHead>
                              <TableHead className="font-bold text-gray-700">Tác giả ID</TableHead>
                              <TableHead className="font-bold text-gray-700">NXB ID</TableHead>
                              <TableHead className="text-right font-bold text-gray-700">Thao tác</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {books.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                                  Không tìm thấy sách
                                </TableCell>
                              </TableRow>
                            ) : (
                              books.map((b) => (
                                <TableRow key={b.id} className="hover:bg-gray-50">
                                  <TableCell>{b.id}</TableCell>
                                  <TableCell>{b.tieu_de}</TableCell>
                                  <TableCell>{b.tacgia_id}</TableCell>
                                  <TableCell>{b.nxb_id}</TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                      <Button 
                                        size="sm" 
                                        onClick={() => openBookDetails(b.id)} 
                                        className="bg-blue-600 text-white hover:bg-blue-700 border-none"
                                      >
                                        Xem chi tiết
                                      </Button>
                                      <Button
                                        size="sm"
                                        onClick={() => handleDeleteBook(b.id)}
                                        className="bg-red-600 text-white hover:bg-red-700 border-none"
                                      >
                                        Xóa
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-gray-600">Trang {currentPage} / {totalPages}</div>
                        <div className="flex gap-2">
                          <Button disabled={currentPage <= 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</Button>
                          <Button disabled={currentPage >= totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Detail View */}
              {selectedBook && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedBook.tieu_de}</h2>
                      <p className="text-sm text-gray-600 mt-1">ID: {selectedBook.id}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={closeDetails}>Quay lại</Button>
                    </div>
                  </div>

                  {detailLoading ? (
                    <div className="text-center py-8">Đang tải chi tiết sách...</div>
                  ) : detailError ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                      {detailError}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <strong>Tác giả ID:</strong> {selectedBook.tacgia_id}
                        </div>
                        <div>
                          <strong>Nhà xuất bản ID:</strong> {selectedBook.nxb_id}
                        </div>
                        <div>
                          <strong>Năm xuất bản:</strong> {selectedBook.nam_xb}
                        </div>
                        <div>
                          <strong>Ngôn ngữ:</strong> {selectedBook.ngon_ngu}
                        </div>
                        <div>
                          <strong>ISBN:</strong> {selectedBook.isbn}
                        </div>
                        <div>
                          <strong>Tóm tắt:</strong>
                          <p className="text-sm text-gray-700 mt-1">{selectedBook.tom_tat || 'Chưa có'}</p>
                        </div>
                        <div>
                          <strong>Thể loại:</strong>
                          <div className="mt-2 flex gap-2 flex-wrap">
                            {(selectedBook.the_loai || []).map((t) => (
                              <span key={t.id} className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-sm">{t.ten}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Danh sách bản sao</h3>

                        {copiesLoading ? (
                          <div className="text-center py-8">Đang tải danh sách bản sao...</div>
                        ) : copiesError ? (
                          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{copiesError}</div>
                        ) : (
                          <div className="rounded-lg border border-gray-200 overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-gray-50 hover:bg-gray-50">
                                  <TableHead className="w-[80px] font-bold text-gray-700">ID</TableHead>
                                  <TableHead className="font-bold text-gray-700">Mã vạch</TableHead>
                                  <TableHead className="font-bold text-gray-700">Trạng thái</TableHead>
                                  <TableHead className="font-bold text-gray-700">Ngày mua</TableHead>
                                  <TableHead className="text-right font-bold text-gray-700">Thao tác</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {copies.length === 0 ? (
                                  <TableRow>
                                    <TableCell colSpan={5} className="text-center text-gray-500 py-8">Không có bản sao</TableCell>
                                  </TableRow>
                                ) : (
                                  copies.map((c) => (
                                    <TableRow key={c.id} className="hover:bg-gray-50">
                                      <TableCell>{c.id}</TableCell>
                                      <TableCell>{c.ma_vach}</TableCell>
                                      <TableCell>{c.trang_thai}</TableCell>
                                      <TableCell>{formatDate(c.ngay_mua)}</TableCell>
                                      <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                          <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700 border-none" onClick={() => setSelectedCopy(c)}>Xem chi tiết</Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Copy detail modal */}
              {selectedCopy && (
                <div
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={() => setSelectedCopy(null)}
                >
                  <div
                    style={{
                      backgroundColor: 'white',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      maxWidth: '500px',
                      width: '90%'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 className="text-xl font-bold mb-3">Chi tiết bản sao #{selectedCopy.id}</h2>
                    <div className="grid grid-cols-1 gap-2">
                      <div><strong>Mã vạch:</strong> {selectedCopy.ma_vach}</div>
                      <div><strong>Trạng thái:</strong> {selectedCopy.trang_thai}</div>
                      <div><strong>Ngày mua:</strong> {formatDate(selectedCopy.ngay_mua)}</div>
                      <div><strong>Giá trị:</strong> {selectedCopy.gia_tri?.toLocaleString() ?? 'N/A'}</div>
                      <div><strong>Kệ sách:</strong> {selectedCopy.ke_sach || 'Chưa cập nhật'}</div>
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => setSelectedCopy(null)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          borderRadius: '4px',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: 600
                        }}
                      >
                        Đóng
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
