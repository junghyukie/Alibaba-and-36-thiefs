import React from 'react';
import Header from './Header';

// Placeholder data functions
const GetUserName = () => 'Nguyễn Văn Hai';
const GetBorrowBooks = () => [
  { date: '01/01/2025', title: 'Harry Potter', author: 'J.K Rowling' },
  { date: '05/02/2025', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { date: '10/03/2025', title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { date: '15/04/2025', title: '1984', author: 'George Orwell' },
  { date: '20/05/2025', title: 'Pride and Prejudice', author: 'Jane Austen' },
  { date: '25/06/2025', title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
];

const BorrowHistory: React.FC = () => {
  const userName = GetUserName();
  const borrowBooks = GetBorrowBooks();
  const handleSearch = () => {
    // Not used in this component, but required by Header
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        section.borrow-bg {
          min-height: calc(100vh - 64px);
          width: 100%;
          padding: 24px;
          background: url('https://images2.alphacoders.com/104/1042582.jpg') no-repeat center/cover;
        }
        .borrow-container {
          max-width: 900px;
          margin: 0 auto;
        }
        .borrow-heading {
          font-size: 1.8rem;
          font-weight: 700;
          color: #ddfe04ff;
          margin-bottom: 24px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          text-align: center;
        }
        .borrow-scroll {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: calc(100vh - 200px);
          overflow-y: auto;
          padding-right: 8px;
        }
        .borrow-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .borrow-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .borrow-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.5);
          border-radius: 10px;
        }
        .borrow-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.7);
        }
        .borrow-window {
          background: rgba(255, 255, 255, 0.92);
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }
        .borrow-window:hover {
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
          transform: translateY(-2px);
        }
        .borrow-date {
          font-size: 0.95rem;
          font-weight: 600;
          color: #1e40af;
          margin-bottom: 8px;
        }
        .book-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .book-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
        }
        .book-author {
          font-size: 0.9rem;
          color: #6b7280;
          font-style: italic;
        }
        @media (max-width: 640px) {
          section.borrow-bg {
            padding: 16px;
          }
          .borrow-heading {
            font-size: 1.5rem;
          }
          .borrow-scroll {
            max-height: calc(100vh - 180px);
          }
        }
      `}</style>

      <Header onSearch={handleSearch} />

      <section className="borrow-bg">
        <div className="borrow-container">
          <h1 className="borrow-heading">Lịch sử mượn của {userName}</h1>

          <div className="borrow-scroll">
            {borrowBooks.map((book, index) => (
              <div key={index} className="borrow-window">
                <div className="borrow-date">{book.date}</div>
                <div className="book-details">
                  <div className="book-title">{book.title}</div>
                  <div className="book-author">{book.author}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BorrowHistory;
