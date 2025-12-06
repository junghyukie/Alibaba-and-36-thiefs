import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Patron, LatePatron, ListPatronResult, LatePatronResult } from '../types/patron';

const PatronList: React.FC = () => {
  const [patrons, setPatrons] = useState<Patron[]>([]);
  const [latePatrons, setLatePatron] = useState<LatePatron[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatron, setSelectedPatron] = useState<Patron | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;

  // Dummy search handler for Header component
  const handleSearch = () => {
    // Not used in this component, but required by Header
  };

  // Fetch patrons from API
  const fetchPatrons = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Vui lòng đăng nhập để xem danh sách độc giả');
        return;
      }

      const res = await fetch(
        `http://localhost:3001/staff/service/list-account?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data: ListPatronResult = await res.json();
      
      if (data.success && data.data) {
        setPatrons(data.data);
        setTotalPages(data.totalPages || 1);
        setCurrentPage(page);
      } else {
        setError(data.message || 'Không thể tải danh sách độc giả');
      }
    } catch (err) {
      console.error('Error fetching patrons:', err);
      setError('Lỗi kết nối đến server');
    } finally {
      setLoading(false);
    }
  };

  // Fetch late patrons from API
  const fetchLatePatrons = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Vui lòng đăng nhập để xem danh sách độc giả trễ hạn');
        return;
      }

      const res = await fetch('http://localhost:3001/staff/service/late', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data: LatePatronResult = await res.json();
      
      if (data.success && data.data) {
        setLatePatron(data.data);
      } else {
        setError(data.message || 'Không thể tải danh sách độc giả trễ hạn');
      }
    } catch (err) {
      console.error('Error fetching late patrons:', err);
      setError('Lỗi kết nối đến server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatrons(1);
    fetchLatePatrons();
  }, []);

  // Filter patrons by search term
  const filteredPatrons = patrons.filter((patron: Patron) =>
    patron.ho_ten.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (patron: Patron) => {
    setSelectedPatron(patron);
    setIsDialogOpen(true);
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchPatrons(newPage);
    }
  };

  return (
    <div id="webcrumbs">
      <Header onSearch={handleSearch} />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-6">
              <h1 className="text-3xl font-bold text-gray-800">Quản lý Độc giả</h1>
            </div>
            <div className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100">
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 font-semibold">
                  Danh sách độc giả
                </TabsTrigger>
                <TabsTrigger value="late" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 font-semibold">
                  Độc giả trễ hạn
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: All Patrons */}
              <TabsContent value="all" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <Input
                    placeholder="Tìm kiếm theo tên độc giả..."
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
                  <>
                    <div className="rounded-lg border border-gray-200 overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50 hover:bg-gray-50">
                            <TableHead className="w-[80px] font-bold text-gray-700">ID</TableHead>
                            <TableHead className="font-bold text-gray-700">Tên độc giả</TableHead>
                            <TableHead className="font-bold text-gray-700">Ngày sinh</TableHead>
                            <TableHead className="text-right font-bold text-gray-700">Thao tác</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                        {filteredPatrons.length > 0 ? (
                          filteredPatrons.map((patron: Patron) => (
                            <TableRow key={patron.id} className="hover:bg-blue-50 transition-colors">
                                <TableCell className="font-medium text-gray-900">{patron.id}</TableCell>
                                <TableCell className="text-gray-700">{patron.ho_ten}</TableCell>
                                <TableCell className="text-gray-600">{formatDate(patron.ngay_sinh)}</TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewDetails(patron)}
                                    className="bg-blue-600 text-white hover:bg-blue-700 border-none"
                                  >
                                    Xem chi tiết
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                                Không tìm thấy độc giả nào
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center space-x-4 mt-6 py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-4"
                        >
                          ← Trang trước
                        </Button>
                        <span className="text-sm font-medium text-gray-700 px-4 py-2 bg-gray-100 rounded">
                          Trang {currentPage} / {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-4"
                        >
                          Trang sau →
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>

              {/* Tab 2: Late Patrons */}
              <TabsContent value="late" className="space-y-4">
                {loading ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                    <p className="mt-4">Đang tải dữ liệu...</p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 hover:bg-gray-50">
                          <TableHead className="w-[80px] font-bold text-gray-700">ID</TableHead>
                          <TableHead className="font-bold text-gray-700">Tên độc giả</TableHead>
                          <TableHead className="font-bold text-gray-700">Ngày sinh</TableHead>
                          <TableHead className="font-bold text-gray-700">Ngày mượn</TableHead>
                          <TableHead className="font-bold text-gray-700">Ngày hết hạn</TableHead>
                          <TableHead className="font-bold text-gray-700">Số ngày trễ</TableHead>
                          <TableHead className="font-bold text-gray-700">Tên sách</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                      {latePatrons.length > 0 ? (
                        latePatrons.map((patron: LatePatron, index: number) => (
                          <TableRow key={index} className="hover:bg-red-50 transition-colors">
                              <TableCell className="font-medium text-gray-900">{patron.id}</TableCell>
                              <TableCell className="text-gray-700">{patron.ten_doc_gia}</TableCell>
                              <TableCell className="text-gray-600">{formatDate(patron.ngay_sinh)}</TableCell>
                              <TableCell className="text-gray-600">{formatDate(patron.ngay_muon)}</TableCell>
                              <TableCell className="text-gray-600">{formatDate(patron.ngay_het_han)}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800 ring-1 ring-inset ring-red-600/20">
                                  {patron.so_ngay_tre} ngày
                                </span>
                              </TableCell>
                              <TableCell className="text-gray-700 font-medium">{patron.tieu_de}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                              Không có độc giả trễ hạn
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        </main>
      </div>

      {/* Dialog for Patron Details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-900">
              Thông tin chi tiết độc giả
            </DialogTitle>
            <DialogDescription>
              Thông tin đầy đủ về độc giả
            </DialogDescription>
          </DialogHeader>
          
          {selectedPatron && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">ID:</span>
                <span className="col-span-3">{selectedPatron.id}</span>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Họ và tên:</span>
                <span className="col-span-3">{selectedPatron.ho_ten}</span>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Email:</span>
                <span className="col-span-3">{selectedPatron.email}</span>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Số điện thoại:</span>
                <span className="col-span-3">{selectedPatron.dien_thoai || 'N/A'}</span>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Ngày sinh:</span>
                <span className="col-span-3">{formatDate(selectedPatron.ngay_sinh)}</span>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Địa chỉ:</span>
                <span className="col-span-3">{selectedPatron.dia_chi || 'N/A'}</span>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Vai trò:</span>
                <span className="col-span-3">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {selectedPatron.vai_tro}
                  </span>
                </span>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-semibold text-right">Giới hạn mượn:</span>
                <span className="col-span-3">{selectedPatron.gioi_han_muon} cuốn</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatronList;
