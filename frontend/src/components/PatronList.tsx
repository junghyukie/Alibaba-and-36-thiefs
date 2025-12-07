import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Patron, LatePatron, ListPatronResult, LatePatronResult } from '../types/patron';
const API_URL = import.meta.env.VITE_API_URL;

const PatronList: React.FC = () => {
  const navigate = useNavigate();
  const [patrons, setPatrons] = useState<Patron[]>([]);
  const [latePatrons, setLatePatron] = useState<LatePatron[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPatron, setSelectedPatron] = useState<Patron | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
        setLoading(false);
        return;
      }

      const res = await fetch(
        `${API_URL}/staff/service/list-account?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data: ListPatronResult = await res.json();
      
      console.log('Patron list response:', data);
      
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
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_URL}/staff/service/late`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data: LatePatronResult = await res.json();
      
      console.log('Late patrons response:', data);
      
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
    console.log('PatronList component mounted');
    fetchPatrons(1);
    fetchLatePatrons();
  }, []);

  useEffect(() => {
    console.log('Dialog state changed:', isDialogOpen);
    console.log('Selected patron:', selectedPatron);
  }, [isDialogOpen, selectedPatron]);

  // Filter patrons by search term
  const filteredPatrons = patrons.filter((patron: Patron) =>
    patron.ho_ten.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (patron: Patron) => {
    console.log('Opening dialog for patron:', patron);
    setSelectedPatron(patron);
    setIsDialogOpen(true);
    console.log('Dialog state set to true');
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPatron(null);
  };

  const handleActivateAccount = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Vui lòng đăng nhập');
        return;
      }

      const res = await fetch(`${API_URL}/staff/service/activate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });

      const data = await res.json();
      
      if (data.success) {
        alert('Kích hoạt tài khoản thành công!');
        setIsDialogOpen(false);
        fetchPatrons(currentPage);
      } else {
        alert(data.message || 'Không thể kích hoạt tài khoản');
      }
    } catch (err) {
      console.error('Error activating account:', err);
      alert('Lỗi kết nối đến server');
    }
  };

  const handleLockAccount = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Vui lòng đăng nhập');
        return;
      }

      const res = await fetch(`${API_URL}/staff/service/lock`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });

      const data = await res.json();
      
      if (data.success) {
        alert('Khóa tài khoản thành công!');
        setIsDialogOpen(false);
        fetchPatrons(currentPage);
      } else {
        alert(data.message || 'Không thể khóa tài khoản');
      }
    } catch (err) {
      console.error('Error locking account:', err);
      alert('Lỗi kết nối đến server');
    }
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
    <>
      {/* Test Dialog - Simple version */}
      {isDialogOpen && (
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
          onClick={() => setIsDialogOpen(false)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Thông tin chi tiết độc giả
            </h2>
            {selectedPatron && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <strong>ID:</strong> {selectedPatron.id}
                </div>
                <div>
                  <strong>Trạng thái:</strong> {selectedPatron.trang_thai}
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <strong>Họ tên:</strong> {selectedPatron.ho_ten}
                </div>
                <div>
                  <strong>Email:</strong> {selectedPatron.email}
                </div>
                <div>
                  <strong>SĐT:</strong> {selectedPatron.dien_thoai || 'Chưa cập nhật'}
                </div>
                <div>
                  <strong>Ngày sinh:</strong> {formatDate(selectedPatron.ngay_sinh)}
                </div>
                <div>
                  <strong>Giới tính:</strong> {selectedPatron.gioi_tinh || 'Chưa cập nhật'}
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <strong>Địa chỉ:</strong> {selectedPatron.dia_chi || 'Chưa cập nhật'}
                </div>
                <div>
                  <strong>Vai trò:</strong> {selectedPatron.vai_tro}
                </div>
                <div>
                  <strong>Giới hạn mượn:</strong> {selectedPatron.gioi_han_muon} cuốn
                </div>
              </div>
            )}
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid #e5e7eb'
            }}>
              {selectedPatron?.trang_thai === 'PENDING' && (
                <button
                  onClick={() => selectedPatron && handleActivateAccount(selectedPatron.id)}
                  style={{
                    flex: 1,
                    padding: '0.5rem 1rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                >
                  Kích hoạt tài khoản
                </button>
              )}
              {selectedPatron?.trang_thai === 'ACTIVE' && (
                <button
                  onClick={() => selectedPatron && handleLockAccount(selectedPatron.id)}
                  style={{
                    flex: 1,
                    padding: '0.5rem 1rem',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                >
                  Khóa tài khoản
                </button>
              )}
              <button
                onClick={() => setIsDialogOpen(false)}
                style={{
                  flex: 1,
                  padding: '0.5rem 1rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
      
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
      </div>
    </>
  );
};

export default PatronList;
