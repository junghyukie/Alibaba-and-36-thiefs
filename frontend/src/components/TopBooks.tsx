import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL;

interface TopBook {
  tieu_de: string;
  tac_gia: string;
  so_luot_dang_muon: number;
}

interface DecodedToken {
  id_acc: number;
  vai_tro: string;
}

const TopBooks: React.FC = () => {
  const [topBooks, setTopBooks] = useState<TopBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<string>('all');
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUserRole(decodedToken.vai_tro);
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
        setUserRole(null);
      }
    }
  }, []);

  const fetchTopBooks = async (period: string = 'all') => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      
      // Sử dụng endpoint công khai (không cần phân quyền)
      const baseEndpoint = `${API_URL}/api/auth/top-book`;
      
      const url = period === 'all' 
        ? baseEndpoint
        : `${baseEndpoint}?period=${period}`;

      console.log('Fetching from URL:', url);
      console.log('User role:', userRole);
      console.log('Token exists:', !!token);

      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);
      
      if (data.success && data.data) {
        setTopBooks(data.data);
        setCurrentPeriod(period);
      } else {
        const errorMsg = data.message || 'Không thể tải danh sách sách';
        console.error('Error from API:', errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      console.error('Error fetching top books:', err);
      setError('Lỗi kết nối đến server: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole !== null) {
      fetchTopBooks('all');
    }
  }, [userRole]);

  const getPeriodTitle = () => {
    switch (currentPeriod) {
      case 'week':
        return 'Top 10 sách được mượn nhiều nhất trong tuần';
      case 'month':
        return 'Top 10 sách được mượn nhiều nhất trong tháng';
      case 'year':
        return 'Top 10 sách được mượn nhiều nhất trong năm';
      default:
        return 'Top 10 sách được mượn nhiều nhất';
    }
  };

  const getMedalIcon = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  };

  const getRankClass = (index: number) => {
    if (index === 0) return 'bg-yellow-50 border-l-4 border-yellow-400';
    if (index === 1) return 'bg-gray-50 border-l-4 border-gray-400';
    if (index === 2) return 'bg-orange-50 border-l-4 border-orange-400';
    return 'hover:bg-blue-50';
  };

  return (
    <div id="webcrumbs">
      <Header/>
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-3xl font-bold text-gray-800">
                📚 Sách phổ biến
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                {getPeriodTitle()}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6 bg-gray-100">
                  <TabsTrigger 
                    value="all" 
                    onClick={() => fetchTopBooks('all')}
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-600 font-semibold"
                  >
                    Tất cả
                  </TabsTrigger>
                  <TabsTrigger 
                    value="week" 
                    onClick={() => fetchTopBooks('week')}
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-600 font-semibold"
                  >
                    Tuần này
                  </TabsTrigger>
                  <TabsTrigger 
                    value="month" 
                    onClick={() => fetchTopBooks('month')}
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-600 font-semibold"
                  >
                    Tháng này
                  </TabsTrigger>
                  <TabsTrigger 
                    value="year" 
                    onClick={() => fetchTopBooks('year')}
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-600 font-semibold"
                  >
                    Năm nay
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={currentPeriod} className="space-y-4">
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
                            <TableHead className="w-[80px] font-bold text-gray-700 text-center">
                              Hạng
                            </TableHead>
                            <TableHead className="font-bold text-gray-700">Tên sách</TableHead>
                            <TableHead className="font-bold text-gray-700">Tác giả</TableHead>
                            <TableHead className="font-bold text-gray-700 text-center">
                              Số lượt mượn
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {topBooks.length > 0 ? (
                            topBooks.map((book: TopBook, index: number) => (
                              <TableRow 
                                key={index} 
                                className={`transition-colors ${getRankClass(index)}`}
                              >
                                <TableCell className="font-bold text-center text-2xl">
                                  {getMedalIcon(index)}
                                </TableCell>
                                <TableCell className="font-medium text-gray-900">
                                  {book.tieu_de}
                                </TableCell>
                                <TableCell className="text-gray-700">
                                  {book.tac_gia}
                                </TableCell>
                                <TableCell className="text-center">
                                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                                    {book.so_luot_dang_muon} lượt
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                                Chưa có dữ liệu
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              {topBooks.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    💡 <strong>Gợi ý:</strong> Những cuốn sách này đang được độc giả yêu thích. 
                    Hãy mượn ngay để không bỏ lỡ!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default TopBooks;
