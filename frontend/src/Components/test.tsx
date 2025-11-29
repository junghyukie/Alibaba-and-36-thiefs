// src/components/LateListPage.tsx

import React, { useEffect, useState } from "react";

// --- TypeScript interface ---
export interface LateRecord {
  ten_doc_gia: string;
  tieu_de: string;
  ngay_het_han: string;
  so_ngay_tre: number;
}

const LateListPage: React.FC = () => {
  const [records, setRecords] = useState<LateRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLateRecords = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("❌ Bạn chưa đăng nhập!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/staff/service/late`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "❌ Lỗi server");
        setRecords([]);
        return;
      }

      setRecords(data.data || []);
    } catch (err) {
      console.error("❌ Lỗi fetch:", err);
      alert("❌ Không thể kết nối server!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLateRecords();
  }, []);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (records.length === 0) return <div>Không có độc giả quá hạn</div>;

  return (
    <div style={styles.container}>
      <h2>📄 Danh sách độc giả quá hạn</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Độc giả</th>
            <th>Tựa đề</th>
            <th>Ngày hết hạn</th>
            <th>Số ngày trễ</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r, index) => (
            <tr key={index}>
              <td>{r.ten_doc_gia}</td>
              <td>{r.tieu_de}</td>
              <td>{r.ngay_het_han}</td>
              <td>{r.so_ngay_tre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LateListPage;

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center" as const,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "20px",
  },
};
