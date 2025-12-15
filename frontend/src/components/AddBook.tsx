import React, { useState, type FormEvent } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

const AddBookForm: React.FC = () => {
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 1. Lấy Token từ localStorage (hoặc nơi bạn lưu trữ)
    const token = localStorage.getItem("token"); 
    
    if (!token) {
        setMessage({ text: 'Lỗi: Vui lòng đăng nhập để thực hiện chức năng này.', type: 'error' });
        return; // Dừng lại nếu không có token
    }

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string | number> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const response = await fetch(`${API_URL}/staff/service/add-book`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // 2. THÊM HEADER AUTHORIZATION
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        setMessage({ text: result.message || 'Thêm sách thành công!', type: 'success' });
        e.currentTarget?.reset?.();
      } else {
        // Xử lý lỗi 401/403 cụ thể nếu cần
        if (response.status === 401) {
            setMessage({ text: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', type: 'error' });
        } else if (response.status === 403) {
            setMessage({ text: 'Bạn không có quyền thêm sách.', type: 'error' });
        } else {
            setMessage({ text: result.error || 'Có lỗi xảy ra', type: 'error' });
        }
      }
    } catch (error: any) {
      setMessage({ text: `Lỗi kết nối: ${error.message}`, type: 'error' });
    }
  };

  return (
    <>
      {/* Google Font Poppins */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Poppins',sans-serif; }
        section {
          display:flex; justify-content:center; align-items:center;
          min-height:100vh; width:100%; padding:20px;
          background:url('https://images2.alphacoders.com/104/1042582.jpg') no-repeat center/cover;
        }
        .box {
          width:440px; max-width:95vw; background:rgba(255,255,255,0.96);
          border-radius:24px; border:2px solid rgba(255,255,255,0.6);
          box-shadow:0 20px 50px rgba(0,0,0,0.3);
          overflow:hidden; display:flex; flex-direction:column;
        }
        .header {
          padding:28px 20px 18px; text-align:center; background:rgba(255,255,255,0.98);
          box-shadow:0 2px 10px rgba(0,0,0,0.1);
        }
        .header h2 {
          font-size:2.2em; color:#1e3a8a; font-weight:700; margin:0;
        }
        .scroll-area {
          flex:1; overflow-y:auto; padding:24px 32px 40px;
          scrollbar-width:thin;
        }
        .scroll-area::-webkit-scrollbar { width:6px; }
        .scroll-area::-webkit-scrollbar-thumb { background:#888; border-radius:3px; }

        /* Input nhóm */
        .input-group {
          position:relative; margin:28px 0;
        }
        .input-group input,
        .input-group textarea {
          width:100%; padding:12px 12px 12px 5px;
          background:transparent; border:none; border-bottom:2px solid #666;
          outline:none; font-size:1em; color:#333;
          resize:none;
        }
        .input-group textarea { height:100px; }

        .input-group label {
          position:absolute; top:50%; left:5px;
          transform:translateY(-50%); font-size:1em; color:#666;
          pointer-events:none; transition:all .35s ease;
        }
        .input-group input:focus ~ label,
        .input-group input:not(:placeholder-shown) ~ label,
        .input-group textarea:focus ~ label,
        .input-group textarea:not(:placeholder-shown) ~ label {
          top:-8px; left:0; font-size:0.85em; color:#1e40af; font-weight:500;
        }

        .footer {
          padding:20px; background:rgba(255,255,255,0.98);
          box-shadow:0 -2px 10px rgba(0,0,0,0.1);
        }
        .footer button {
          width:100%; height:52px; background:#1e40af; color:white;
          border:none; border-radius:50px; font-size:1.15em; font-weight:600;
          cursor:pointer; transition:all .3s;
        }
        .footer button:hover {
          background:#1e3a8a; transform:translateY(-3px);
          box-shadow:0 10px 25px rgba(30,64,175,0.4);
        }

        .message {
          margin-top:16px; padding:12px 16px; border-radius:8px; font-weight:500;
          text-align:center;
        }
        .message.success { background:#d4edda; color:#155724; border:1px solid #c3e6cb; }
        .message.error   { background:#f8d7da; color:#721c24; border:1px solid #f5c6cb; }

        @media (max-width:480px) {
          .box { border-radius:18px; }
          .header h2 { font-size:1.9em; }
        }
      `}</style>

      <section>
        <div className="box">
          <div className="header">
            <h2>Thêm Sách Mới</h2>
          </div>

          <div className="scroll-area">
            <form onSubmit={handleSubmit} id="addBookForm">
              {[
                { label: 'Tên sách', name: 'tieu_de', required: true },
                { label: 'Tên tác giả', name: 'ten_tg', required: true },
                { label: 'Tên NXB', name: 'nxb', required: true },
                { label: 'ISBN', name: 'isbn' },
                { label: 'Tóm tắt', name: 'tom_tat', textarea: true },
                { label: 'Năm xuất bản', name: 'nam_xb', type: 'number' },
                { label: 'Ngôn ngữ', name: 'ngon_ngu' },
                // Thêm trường Thể loại sách vào cuối
                { label: 'Thể loại', name: 'the_loai', required: true }, 
              ].map((field) => (
                <div className="input-group" key={field.name}>
                  {field.textarea ? (
                    <textarea name={field.name} placeholder=" " required={field.required} />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      name={field.name}
                      placeholder=" "
                      required={field.required}
                    />
                  )}
                  <label>{field.label}</label>
                </div>
              ))}

              {message && (
                <div className={`message ${message.type}`}>
                  {message.text}
                </div>
              )}
            </form>
          </div>

          <div className="footer">
            <button type="submit" form="addBookForm">
              Thêm Sách
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddBookForm;