import React, { useState } from "react";
import "./style.css";

const UpdateReturnDate: React.FC = () => {
  const [idMuon, setIdMuon] = useState("");
  const [idDocGia, setIdDocGia] = useState("");
  const [ngayTraThucTe, setNgayTraThucTe] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Dữ liệu gửi đi:", {
      id_muon: idMuon,
      id_doc_gia: Number(idDocGia),
      han_tra: ngayTraThucTe,
    });

    try {
      const res = await fetch("http://localhost:3001/api/borrowed/change-return-date", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_muon: idMuon,
          id_doc_gia: Number(idDocGia),
          han_tra: ngayTraThucTe,
        }),
      });

      const data = await res.json();
      
      if(res.ok){
        alert(data.message || "Cập nhật ngày trả thành công!");
      }
      else{
        alert(data.message || "Lỗi");
      }
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      alert("Không thể kết nối tới server!");
    }
  };

  return (
    <div className="register-container">
      <h2>Cập nhật ngày trả sách</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Mã mượn (id_muon)"
          value={idMuon}
          onChange={(e) => setIdMuon(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Mã độc giả (id_doc_gia)"
          value={idDocGia}
          onChange={(e) => setIdDocGia(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Ngày trả thực tế"
          value={ngayTraThucTe}
          onChange={(e) => setNgayTraThucTe(e.target.value)}
          required
        />
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  );
};

export default UpdateReturnDate;
