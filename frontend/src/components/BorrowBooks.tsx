import React, { useEffect, useState } from 'react';
import Header from './Header';
import useUser from '../hooks/useUser';
import { getCardId, InDebt } from './LibraryCard';

type CartItem = {
  id: string;
  title: string;
  author: string;
};

const BorrowBooks: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cartItems');
      if (raw) setCart(JSON.parse(raw));
    } catch (e) {
      setCart([]);
    }
  }, []);

  const fullname = useUser().userInfo?.ho_ten || 'Bạn chưa cập nhật thông tin';
  const cardId = getCardId();

  const handleConfirm = () => {
    if (InDebt) {
      alert('Vui lòng thanh toán hết công nợ trước khi mượn sách');
    } else {
      alert('Mượn sách thành công');
      // Optionally clear cart
      try {
        localStorage.removeItem('cartItems');
        setCart([]);
      } catch (e) {}
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        section.borrow-bg {
          display:flex; align-items:center; justify-content:center;
          min-height:calc(100vh - 64px);
          width:100%; padding:24px;
          background: url('https://images2.alphacoders.com/104/1042582.jpg') no-repeat center/cover;
        }
        .panel {
          width:880px; max-width:95vw; min-height:360px; background: rgba(255,255,255,0.96);
          border-radius:16px; box-shadow: 0 12px 40px rgba(0,0,0,0.18);
          padding:28px; display:flex; flex-direction:column; gap:18px;
        }
        .info-row { display:flex; gap:12px; align-items:center; }
        .label { min-width:160px; color:#374151; font-weight:700; }
        .value { flex:1; padding:10px 12px; background:#f8fafc; border-radius:8px; color:#111827; }

        .books-grid { display:flex; flex-direction:column; gap:12px; margin-top:8px; }
        .book-item { background:#fff; border:1px solid #e6e6e6; padding:12px 14px; border-radius:10px; }
        .book-title { font-weight:800; font-size:1.05rem; color:#0f172a; }
        .book-author { color:#6b7280; margin-top:6px; }

        .confirm-btn { margin-top:14px; align-self:flex-end; padding:10px 18px; background:#1e40af; color:white; border:none; border-radius:8px; cursor:pointer; }
        .confirm-btn:hover { background:#1e3a8a; }

        @media (max-width:640px) {
          .panel { width:92vw; padding:18px; }
          .label { min-width:120px; }
        }
      `}</style>

      <Header />

      <section className="borrow-bg">
        <div className="panel" role="region" aria-label="Borrow Books">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, color: '#1e3a8a' }}>Xác nhận mượn sách</h2>
            <div style={{ color: '#374151' }}>{cart.length} sách trong giỏ</div>
          </div>

          <div className="info-row">
            <div className="label">Họ và tên:</div>
            <div className="value">{fullname}</div>
          </div>

          <div className="info-row">
            <div className="label">ID thẻ thư viện:</div>
            <div className="value">{cardId}</div>
          </div>

          <div className="label" style={{ marginTop: 8 }}>Sách trong giỏ</div>
          <div className="books-grid">
            {cart.length === 0 ? (
              <div className="book-item">Giỏ hàng trống</div>
            ) : (
              cart.map((b) => (
                <div key={b.id} className="book-item">
                  <div className="book-title">{b.title}</div>
                  <div className="book-author">{b.author}</div>
                </div>
              ))
            )}
          </div>

          <button className="confirm-btn" onClick={handleConfirm}>Xác nhận mượn sách</button>
        </div>
      </section>
    </>
  );
};

export default BorrowBooks;
