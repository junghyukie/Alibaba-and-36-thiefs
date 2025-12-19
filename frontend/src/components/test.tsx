// // src/components/LateListPage.tsx

// import React, { useEffect, useState } from "react";

// // --- TypeScript interface ---
// export interface LateRecord {
//   ten_doc_gia: string;
//   tieu_de: string;
//   ngay_het_han: string;
//   so_ngay_tre: number;
// }

// const LateListPage: React.FC = () => {
//   const [records, setRecords] = useState<LateRecord[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchLateRecords = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("❌ Bạn chưa đăng nhập!");
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:3001/staff/service/late`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         alert(data.message || "❌ Lỗi server");
//         setRecords([]);
//         return;
//       }

//       setRecords(data.data || []);
//     } catch (err) {
//       console.error("❌ Lỗi fetch:", err);
//       alert("❌ Không thể kết nối server!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLateRecords();
//   }, []);

//   if (loading) return <div>Đang tải dữ liệu...</div>;
//   if (records.length === 0) return <div>Không có độc giả quá hạn</div>;

//   return (
//     <div style={styles.container}>
//       <h2>📄 Danh sách độc giả quá hạn</h2>

//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th>Độc giả</th>
//             <th>Tựa đề</th>
//             <th>Ngày hết hạn</th>
//             <th>Số ngày trễ</th>
//           </tr>
//         </thead>

//         <tbody>
//           {records.map((r, index) => (
//             <tr key={index}>
//               <td>{r.ten_doc_gia}</td>
//               <td>{r.tieu_de}</td>
//               <td>{r.ngay_het_han}</td>
//               <td>{r.so_ngay_tre}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LateListPage;

// const styles = {
//   container: {
//     maxWidth: "800px",
//     margin: "40px auto",
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "10px",
//     boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//     textAlign: "center" as const,
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse" as const,
//     marginTop: "20px",
//   },
// };

// import React, { useState } from "react";

// const AddBook: React.FC = () => {
//   const [form, setForm] = useState({
//     ten_tg: "",
//     nxb: "",
//     tieu_de: "",
//     isbn: "",
//     tom_tat: "",
//     nam_xb: "",
//     ngon_ngu: "",
//     the_loai: "", // thêm field thể loại
//   });

//   // --- handle change ---
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // --- handle submit ---
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("❌ Bạn chưa đăng nhập!");
//       return;
//     }

//     // chuyển thể loại từ chuỗi -> mảng
//     const theLoaiArray = form.the_loai
//       .split(",")
//       .map((t) => t.trim())
//       .filter((t) => t !== "");

//     const payload = {
//       ten_tg: form.ten_tg,
//       nxb: form.nxb,
//       tieu_de: form.tieu_de,
//       isbn: form.isbn,
//       tom_tat: form.tom_tat.trim() === "" ? null : form.tom_tat,
//       nam_xb: Number(form.nam_xb),
//       ngon_ngu: form.ngon_ngu,
//       the_loai: theLoaiArray, // gửi mảng thể loại
//     };

//     try {
//       const res = await fetch("http://localhost:3001/staff/service/add-book", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       console.log("Server response:", data);

//       if (!res.ok || !data.success) {
//         alert(data.message || "❌ Lỗi server");
//         return;
//       }

//       alert("✔️ Thêm sách thành công!");
//     } catch (err) {
//       console.error("❌ Lỗi fetch:", err);
//       alert("❌ Không thể kết nối server!");
//     }
//   };

//   return (
//     <>
//       <style>{`
//         body { margin:0; padding:0; font-family:Poppins, sans-serif; background:#f0f0f0; }
//         .container { width:100%; min-height:100vh; display:flex; justify-content:center; align-items:center; }
//         .box { background:white; padding:25px; width:420px; border-radius:12px; box-shadow:0 0 10px rgba(0,0,0,0.1); }
//         h2 { text-align:center; margin-bottom:20px; }
//         .input-field { margin-bottom:15px; }
//         .input-field label { display:block; margin-bottom:5px; font-weight:500; }
//         .input-field input, .input-field textarea { width:100%; padding:10px; border:1px solid #ccc; border-radius:8px; outline:none; font-size:0.95rem; }
//         button { width:100%; padding:10px; background:#333; color:white; border:none; border-radius:8px; cursor:pointer; font-size:1rem; }
//         button:hover { opacity:0.9; }
//       `}</style>

//       <div className="container">
//         <div className="box">
//           <h2>Thêm Sách</h2>

//           <form onSubmit={handleSubmit}>
//             <div className="input-field">
//               <label>Tên tác giả</label>
//               <input name="ten_tg" value={form.ten_tg} onChange={handleChange} required />
//             </div>

//             <div className="input-field">
//               <label>Nhà xuất bản</label>
//               <input name="nxb" value={form.nxb} onChange={handleChange} required />
//             </div>

//             <div className="input-field">
//               <label>Tiêu đề</label>
//               <input name="tieu_de" value={form.tieu_de} onChange={handleChange} required />
//             </div>

//             <div className="input-field">
//               <label>ISBN</label>
//               <input name="isbn" value={form.isbn} onChange={handleChange} required />
//             </div>

//             <div className="input-field">
//               <label>Tóm tắt (optional)</label>
//               <textarea name="tom_tat" rows={3} value={form.tom_tat} onChange={handleChange} />
//             </div>

//             <div className="input-field">
//               <label>Năm xuất bản</label>
//               <input type="number" name="nam_xb" value={form.nam_xb} onChange={handleChange} required />
//             </div>

//             <div className="input-field">
//               <label>Ngôn ngữ</label>
//               <input name="ngon_ngu" value={form.ngon_ngu} onChange={handleChange} required />
//             </div>

//             <div className="input-field">
//               <label>Thể loại (có thể nhập nhiều, cách nhau bằng dấu , )</label>
//               <input name="the_loai" value={form.the_loai} onChange={handleChange} placeholder="Văn học, Khoa học, Truyện tranh..." />
//             </div>

//             <button type="submit">Gửi</button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddBook;


// import React, { useState } from "react";

// export interface addBanSaoInput {
//   ten_sach: string;
//   ma_vach: string;
//   ngay_mua: string; // ISO string
//   gia_tri: number;
//   ke_sach: string;
// }

// const AddBanSao: React.FC = () => {
//   const [form, setForm] = useState({
//     ten_sach: "",
//     ma_vach: "",
//     ngay_mua: "",
//     gia_tri: "", // string
//     ke_sach: "",
//   });

//   // --- handle change ---
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // --- handle submit ---
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("❌ Bạn chưa đăng nhập!");
//       return;
//     }

//     const payload: addBanSaoInput = {
//       ten_sach: form.ten_sach,
//       ma_vach: form.ma_vach,
//       ngay_mua: form.ngay_mua,
//       gia_tri: Number(form.gia_tri), // chuyển sang number
//       ke_sach: form.ke_sach,
//     };

//     try {
//       const res = await fetch("http://localhost:3001/staff/service/add-ban-sao", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       console.log("Server response:", data);

//       if (!res.ok || !data.success) {
//         alert(data.message || "❌ Lỗi server");
//         return;
//       }

//       alert("✔️ Thêm bản sao thành công!");
//     } catch (err) {
//       console.error("❌ Lỗi fetch:", err);
//       alert("❌ Không thể kết nối server!");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="box">
//         <h2>Thêm Bản Sao Sách</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-field">
//             <label>Tên sách</label>
//             <input name="ten_sach" value={form.ten_sach} onChange={handleChange} required />
//           </div>

//           <div className="input-field">
//             <label>Mã vạch</label>
//             <input name="ma_vach" value={form.ma_vach} onChange={handleChange} required />
//           </div>

//           <div className="input-field">
//             <label>Ngày mua</label>
//             <input type="date" name="ngay_mua" value={form.ngay_mua} onChange={handleChange} required />
//           </div>

//           <div className="input-field">
//             <label>Giá trị</label>
//             <input type="number" name="gia_tri" value={form.gia_tri} onChange={handleChange} required />
//           </div>

//           <div className="input-field">
//             <label>Kệ sách</label>
//             <input name="ke_sach" value={form.ke_sach} onChange={handleChange} required />
//           </div>

//           <button type="submit">Gửi</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddBanSao;


// import React, { useEffect, useState } from "react";

// interface TopBook {
//   tieu_de: string;
//   tac_gia: string;
//   so_luot_dang_muon: number;
// }

// const TopBook: React.FC = () => {
//   const [books, setBooks] = useState<TopBook[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTopBooks = async () => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     alert("❌ Bạn chưa đăng nhập!");
//     return;
//   }

//   try {
//     const res = await fetch("http://localhost:3001/user/service/top-book", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();

//     if (!res.ok || !data.success) {
//       return alert(data.message || "❌ Không lấy được top sách");
//     }

//     setBooks(data.data);
//   } catch (err) {
//     console.error(err);
//     alert("❌ Không thể kết nối server!");
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     fetchTopBooks();
//   }, []);

//   return (
//     <div className="container">
//       <div className="box">
//         <h2>📚 Top 3 Sách Được Mượn Nhiều Nhất</h2>

//         {loading ? (
//           <p>Đang tải dữ liệu...</p>
//         ) : (
//           <table border={1} cellPadding={10} width="100%">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Tiêu đề</th>
//                 <th>Tác giả</th>
//                 <th>Số lượt đang mượn</th>
//               </tr>
//             </thead>
//             <tbody>
//               {books.map((book, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{book.tieu_de}</td>
//                   <td>{book.tac_gia}</td>
//                   <td>{book.so_luot_dang_muon}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TopBook;

// import React, { useEffect, useState } from "react";

// interface copiesInfor {
//   id: number;
//   tieu_de: string;
//   trang_thai: string;
//   ngay_mua: string; // Date từ backend về là string
//   gia_tri: number;
//   ke_sach: string;
// }

// interface copiesInforService {
//   success: boolean;
//   data?: copiesInfor[];
//   message?: string;
//   page?: number;
//   pageSize?: number;
//   totalPages?: number;
//   totalRecords?: number;
// }

// const CopyListTest: React.FC = () => {
//   const [copies, setCopies] = useState<copiesInfor[]>([]);
//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(20);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);

//   const fetchCopies = async (pageNumber: number) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("❌ Bạn chưa đăng nhập!");
//       return;
//     }

//     try {
//       setLoading(true);

//       // 🔴 SỬA URL nếu backend bạn khác
//       const res = await fetch(
//         `http://localhost:3001/staff/service/list-copies?page=${pageNumber}&pageSize=${pageSize}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data: copiesInforService = await res.json();

//       if (!res.ok || !data.success) {
//         return alert(data.message || "❌ Không lấy được danh sách bản sao");
//       }

//       setCopies(data.data || []);
//       setPage(data.page || 1);
//       setTotalPages(data.totalPages || 1);
//     } catch (err) {
//       console.error(err);
//       alert("❌ Không thể kết nối server!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCopies(page);
//   }, [page]);

//   return (
//     <div className="container">
//       <div className="box">
//         <h2>📦 Danh sách bản sao sách</h2>

//         {loading ? (
//           <p>Đang tải dữ liệu...</p>
//         ) : (
//           <>
//             <table border={1} cellPadding={10} width="100%">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Tiêu đề</th>
//                   <th>Trạng thái</th>
//                   <th>Ngày mua</th>
//                   <th>Giá trị</th>
//                   <th>Kệ sách</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {copies.map((c) => (
//                   <tr key={c.id}>
//                     <td>{c.id}</td>
//                     <td>{c.tieu_de}</td>
//                     <td>{c.trang_thai}</td>
//                     <td>{new Date(c.ngay_mua).toLocaleDateString()}</td>
//                     <td>{c.gia_tri.toLocaleString()} đ</td>
//                     <td>{c.ke_sach}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* PAGINATION */}
//             <div style={{ marginTop: 15, textAlign: "center" }}>
//               <button
//                 disabled={page === 1}
//                 onClick={() => setPage(page - 1)}
//               >
//                 ◀ Trang trước
//               </button>

//               <span style={{ margin: "0 10px" }}>
//                 Trang {page} / {totalPages}
//               </span>

//               <button
//                 disabled={page === totalPages}
//                 onClick={() => setPage(page + 1)}
//               >
//                 Trang sau ▶
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CopyListTest;



// import React, { useState } from "react";
// //const API_URL = import.meta.env.VITE_API_URL;

// const LockAccount: React.FC = () => {
//   const [accountId, setAccountId] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token) return alert("❌ Bạn chưa đăng nhập!");

//     try {
//       const res = await fetch("http://localhost:3001/user/service/extend-book", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ id: Number(accountId) }),
//       });

//       const data = await res.json();
//       if (!res.ok || !data.success) return alert(data.message || "❌ Có lỗi xảy ra");

//       alert(data.message);
//     } catch (err) {
//       console.error(err);
//       alert("❌ Không thể kết nối server!");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="box">
//         <h2>Khóa Tài Khoản</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-field">
//             <label>ID tài khoản</label>
//             <input
//               type="number"
//               value={accountId}
//               onChange={(e) => setAccountId(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit">Khóa</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LockAccount;

// import React, { useState } from "react";
// // Giả định API_URL được định nghĩa trong môi trường
// const API_URL = "http://localhost:3001"; 

// const DeleteBook: React.FC = () => {
//   const [bookId, setBookId] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token) return alert("❌ Bạn chưa đăng nhập!");

//     if (!bookId) return alert("❌ Vui lòng nhập ID sách!");

//     try {
//       // *** THAY ĐỔI QUAN TRỌNG ***
//       // 1. Sử dụng phương thức DELETE
//       // 2. Nối ID sách vào URL: /staff/service/delete-book/123
//       const res = await fetch(API_URL + `/staff/service/delete-book/${bookId}`, {
//         method: "DELETE", // Đã đổi sang DELETE
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         // KHÔNG CẦN body khi dùng DELETE và truyền ID qua URL
//       });

//       const data = await res.json();
      
//       if (res.status === 204) {
//           // Mã 204 No Content là phản hồi phổ biến cho DELETE thành công 
//           // (nếu backend không trả về body). 
//           alert(`✅ Xóa sách ID ${bookId} thành công!`);
//           setBookId("");
//           return;
//       }
      
//       if (!res.ok || !data.success) {
//         // Xử lý các lỗi khác (401, 403, 404)
//         return alert(data.message || `❌ Xóa sách ID ${bookId} thất bại!`);
//       }
      
//       // Xử lý trường hợp backend trả về 200/202 có thông báo thành công
//       alert(`✅ Xóa sách ID ${bookId} thành công!`);
//       setBookId("");
      
//     } catch (err) {
//       console.error(err);
//       alert("❌ Không thể kết nối server!");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="box">
//         <h2>Xóa Sách (DELETE Method)</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-field">
//             <label>ID Sách</label>
//             <input
//               type="number"
//               value={bookId}
//               onChange={(e) => setBookId(e.target.value)}
//               placeholder="Nhập ID sách cần xóa"
//               required
//             />
//           </div>

//           <button type="submit">Xóa Sách</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DeleteBook;

import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const API_URL = import.meta.env.VITE_API_URL;

type Notification = {
  noi_dung: string;
  ngay_tao: string;
};

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Vui lòng đăng nhập để xem thông báo");
        return;
      }

      const res = await fetch(`${API_URL}/user/service/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success && data.data) {
        setNotifications(data.data);
      } else {
        setError(data.message || "Không thể tải thông báo");
      }
    } catch (err) {
      console.error(err);
      setError("Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString("vi-VN");
  };

  return (
    <>
      <Header/>

      <div className="min-h-screen bg-gray-50 px-6 py-8">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b bg-blue-50 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              🔔 Thông báo hệ thống
            </h1>
          </div>

          <div className="p-6">
            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-center py-10 text-gray-500">
                Đang tải thông báo...
              </div>
            ) : (
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="font-bold">Nội dung</TableHead>
                      <TableHead className="w-[180px] font-bold">
                        Thời gian
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {notifications.length > 0 ? (
                      notifications.map((n, index) => (
                        <TableRow key={index} className="hover:bg-blue-50">
                          <TableCell className="text-gray-800">
                            {n.noi_dung}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {formatDateTime(n.ngay_tao)}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          className="text-center text-gray-500 py-8"
                        >
                          Không có thông báo nào
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationList;
