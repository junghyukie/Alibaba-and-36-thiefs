# 📚 Library Management System

A comprehensive full-stack library management system built with modern web technologies. This system allows librarians to manage books, borrowings, fines, and patron accounts, while providing users with an intuitive interface to browse, borrow, and manage their library activities.

## ✨ Features

### For Library Staff
- 📖 **Book Management**: Add, edit, and manage books, authors, publishers, and categories
- 📦 **Copy Management**: Track multiple copies of each book with unique IDs
- 👥 **Patron Management**: View and manage library member accounts
- 📋 **Borrowing System**: Process book checkouts and returns
- 💰 **Fine Management**: Automatic fine calculation for overdue books
- 📊 **Dashboard**: Overview of library statistics and top borrowed books
- 🔔 **Notifications**: Real-time updates on reservations and library activities
- 📈 **Reports**: Track borrowing history and late returns

### For Library Patrons
- 🔍 **Book Search**: Search and filter books by title, author, category, or publisher
- 📚 **Book Details**: View detailed information about books and availability
- 🎫 **Library Card**: Digital library card with QR code
- 📖 **Borrow Books**: Easy borrowing process with availability checking
- ⏱️ **Extend Returns**: Request extensions for borrowed books
- 📜 **Borrowing History**: Track current and past borrowings
- 💳 **Fine History**: View and track any outstanding fines
- 🔔 **Notifications**: Get notified about due dates and reservations
- 🔖 **Book Reservations**: Reserve books that are currently unavailable

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Email Service**: Nodemailer
- **CORS**: Enabled for cross-origin requests

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **UI Framework**: Ionic React
- **Component Library**: Radix UI
- **Styling**: Tailwind CSS
- **Charts**: ApexCharts
- **HTTP Client**: Axios
- **Animations**: Framer Motion

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/junghyukie/Alibaba-and-36-thiefs.git
cd Alibaba-and-36-thiefs
```

### 2. Database Setup

Run the SQL scripts in order to set up your database:

```bash
psql -U your_username -d your_database -f setup_database.sql
psql -U your_username -d your_database -f seed.sql
psql -U your_username -d your_database -f insert_test_accounts.sql
psql -U your_username -d your_database -f insert_book.sql
psql -U your_username -d your_database -f insert_copy.sql
```

### 3. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
npm run build
npm start
```
The backend server will start on `http://localhost:3000`

### 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
npm run build
npm run preview
```
The frontend will start on `http://localhost:5173`

## 👥 User Roles

The system supports two user roles:

1. **Staff/Librarian**: Full access to manage books, copies, borrowings, and patron accounts
2. **Patron/User**: Can browse books, borrow, return, and manage their account

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes with middleware
- Role-based access control
- Secure password reset flow

## 🎨 UI Features

- Responsive design for all devices
- Modern and intuitive interface
- Real-time updates
- Interactive charts and statistics

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Authors

- Contributors: Minh Tung, Hoang Anh, Phuong Nam, Pham Viet, Huu Vinh, Thai Duong

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📧 Contact
For any questions or support, please contact the repository owner.
---

Made with ❤️ by the Alibaba and 36 Thieves team
