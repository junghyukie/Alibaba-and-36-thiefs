import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton';

// Placeholder data functions
const getName = () => 'Nguyễn Văn A';
export const getCardId = () => 'ABC123';
const getCardType = () => 'Thẻ thường';
const getValidity = () => '01/01/2025 - 31/12/2025';
const getDebtAmount = () => '500.000 đồng';

// Tính phí gia hạn (hiện tại mặc định 500k)

// Export debt flag so other components (e.g., BorrowBooks) can read it
export const InDebt = true;

const LibraryCard: React.FC = () => {
  //const navigate = useNavigate();

  const name = getName();
  const cardId = getCardId();
  const cardType = getCardType();
  const validity = getValidity();

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
              <div className="data-value" aria-readonly>{name}</div>
            </div>

            <div className="data-row">
              <div className="data-label">Mã thẻ:</div>
              <div className="data-value" aria-readonly>{cardId}</div>
            </div>

            <div className="data-row">
              <div className="data-label">Loại thẻ:</div>
              <div className="data-value" aria-readonly>{cardType}</div>
            </div>

            <div className="data-row">
              <div className="data-label">Hạn dùng thẻ:</div>
              <div className="data-value validity" aria-readonly>{validity}</div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LibraryCard;