import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton';

const API_URL = import.meta.env.VITE_API_URL;

interface TheInfo {
  ho_ten: string;
  id: number;
  loai_the: string;
  ngay_cap: string;
  ngay_het_han: string;
}

const LibraryCard: React.FC = () => {
  const navigate = useNavigate();
  
  const [cardInfo, setCardInfo] = useState<TheInfo>({
    ho_ten: "",
    id: 0,
    loai_the: "",
    ngay_cap: "",
    ngay_het_han: ""
  });
  const [loading, setLoading] = useState(true);
  const [debtAmount, setDebtAmount] = useState<string>("");
  const [inDebt, setInDebt] = useState<boolean>(false);

  useEffect(() => {
    const fetchCardInfo = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        alert("Bạn chưa đăng nhập. Đang chuyển hướng...");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/user/service/the-infor`, { 
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
        });

        if (res.status === 401) {
          alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (!res.ok) {
          throw new Error("Lỗi khi tải thông tin thẻ.");
        }

        const dataWrapper = await res.json(); 
        const data = dataWrapper.data;
        
        if (dataWrapper.success && data) {
          setCardInfo({
            ho_ten: data.ho_ten || "",
            id: data.id || 0,
            loai_the: data.loai_the || "",
            ngay_cap: data.ngay_cap || "",
            ngay_het_han: data.ngay_het_han || ""
          });
          
          // Nếu backend trả về thông tin nợ, xử lý ở đây
          // setDebtAmount(data.tien_no || "0");
          // setInDebt(data.tien_no && parseFloat(data.tien_no) > 0);
          
        } else {
          throw new Error("Dữ liệu thẻ không hợp lệ hoặc rỗng.");
        }

      } catch (err) {
        console.error(err);
        alert("Không thể kết nối hoặc tải dữ liệu thẻ.");
      } finally {
        setLoading(false);
      }
    };

    fetchCardInfo();
  }, [navigate]);

  // Helper functions để format dữ liệu
  const formatValidity = () => {
    if (!cardInfo.ngay_cap || !cardInfo.ngay_het_han) return "";
    const ngayCap = new Date(cardInfo.ngay_cap).toLocaleDateString('vi-VN');
    const ngayHetHan = new Date(cardInfo.ngay_het_han).toLocaleDateString('vi-VN');
    return `${ngayCap} - ${ngayHetHan}`;
  };

  // Export functions (để các component khác sử dụng)
  const getName = () => cardInfo.ho_ten;
  const getCardId = () => cardInfo.id.toString();
  const getCardType = () => cardInfo.loai_the;
  const getExpiryDate = () => cardInfo.ngay_het_han
  const getValidity = () => formatValidity();

  if (loading) {
    return <div>Đang tải thông tin thẻ...</div>;
  }

  return (
    <>
      <style>{`
        /* Scope CSS chỉ cho phần library card, KHÔNG ảnh hưởng header */
        .library-card-page * { 
          box-sizing: border-box; 
        }
        
        section.lib-bg {
          display:flex; 
          align-items:center; 
          justify-content:center;
          min-height:calc(100vh - 64px);
          width:100%; 
          padding:24px;
          background: url('https://images2.alphacoders.com/104/1042582.jpg') no-repeat center/cover;
        }
        
        .card {
          width:760px; 
          max-width:95vw; 
          min-height:280px; 
          background: rgba(255,255,255,0.95);
          border-radius:16px; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          padding:24px 28px; 
          display:flex; 
          flex-direction:column; 
          gap:18px;
        }
        
        .renew-link {
          background: none;
          border: none;
          color: #2563eb;
          cursor: pointer;
          padding: 0;
          font-size: inherit;
        }
        
        .renew-link:hover {
          text-decoration: underline;
        }
        
        .soon-expire {
          background: #fef3c7;
          padding: 12px;
          border-radius: 8px;
          color: #92400e;
          font-weight: 500;
        }
        
        .card-header { 
          font-size:1.6rem; 
          font-weight:700; 
          color:#1e3a8a; 
        }
        
        .data-row { 
          display:flex; 
          gap:12px; 
          align-items:center; 
        }
        
        .data-label { 
          min-width:140px; 
          color:#374151; 
          font-weight:600; 
        }
        
        .data-value { 
          flex:1; 
          padding:10px 12px; 
          background:#f8fafc; 
          border-radius:8px; 
          color:#111827; 
        }
        
        .validity { 
          display:flex; 
          gap:8px; 
          align-items:center; 
        }

        .modal-overlay {
          position: fixed; 
          top: 0; 
          left: 0; 
          width: 100%; 
          height: 100%;
          background: rgba(0, 0, 0, 0.5); 
          display: flex; 
          align-items: center; 
          justify-content: center;
          z-index: 1000;
        }
        
        .modal {
          background: white; 
          padding: 32px; 
          border-radius: 12px; 
          width: 400px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2); 
          display: flex; 
          flex-direction: column; 
          gap: 16px;
          position: relative;
        }
        
        .modal h2 { 
          margin: 0; 
          font-size: 1.4rem; 
          color: #1e3a8a; 
        }
        
        .modal label { 
          font-weight: 600; 
        }
        
        .modal input[type="date"] {
          padding: 8px; 
          border: 1px solid #ccc; 
          border-radius: 6px;
        }
        
        .modal .readonly-box {
          background: #f3f4f6; 
          padding: 10px; 
          border-radius: 6px; 
          color: #111827;
        }
        
        .modal button {
          padding: 10px 16px; 
          background: #1e40af; 
          color: white; 
          border: none;
          border-radius: 6px; 
          cursor: pointer;
        }
        
        .modal button:hover {
          background: #1e3a8a;
        }

        .close-button {
          position: absolute;
          top: 12px;
          right: 16px;
          background: transparent !important;
          border: none;
          font-size: 1.5rem;
          color: #6b7280 !important;
          cursor: pointer;
          padding: 0 !important;
        }
        
        .close-button:hover {
          color: #111827 !important;
          background: transparent !important;
        }

        @media (max-width:640px) {
          .card { 
            width:92vw; 
            padding:18px; 
          }
          .data-label { 
            min-width:110px; 
          }
          .modal { 
            width: 90vw; 
          }
        }
      `}</style>

      <HomeButton/>

      <div className="library-card-page">
      <section className="lib-bg">
        <div className="card">
          <div className="card-header">Thẻ thư viện</div>

          <div className="data-row">
            <div className="data-label">Họ và tên:</div>
            <div className="data-value" aria-readonly>{cardInfo.ho_ten}</div>
          </div>

          <div className="data-row">
            <div className="data-label">Mã thẻ:</div>
            <div className="data-value" aria-readonly>{cardInfo.id}</div>
          </div>

          <div className="data-row">
            <div className="data-label">Loại thẻ:</div>
            <div className="data-value" aria-readonly>{cardInfo.loai_the}</div>
          </div>

          <div className="data-row">
            <div className="data-label">Hạn dùng thẻ:</div>
            <div className="data-value validity" aria-readonly>{formatValidity()}</div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default LibraryCard;