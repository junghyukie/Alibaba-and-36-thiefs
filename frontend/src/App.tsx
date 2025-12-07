import  Dashboard  from "./components/Dashboard";
import Component from "./components/Component";
import Login from "./components/Login";
import BorrowBooks from "./components/BorrowBooks"
import Register from "./components/Register"
import PersonalInfoInsert from "./components/PersonInfoInsert"
import LibraryCard from "./components/LibraryCard";
import AddBookForm from "./components/AddBook";
import AccInfo from "./components/AccountInfo"; 
import PatronList from "./components/PatronList";
import LockAccount from "./components/test";
import BorrowHistory from "./components/BorrowHistory";
import BorrowHistoryUser from "./components/BorrowHistoryUser";
import PasswordChange from "./components/PasswordChange";
import ExtendCard from "./components/ExtendCard";
import UpdateReturnDate from "./components/UpdateReturnDate";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import type UpdateReturnDate from "./Components/test";





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Component />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/personal-info-insert" element={<PersonalInfoInsert />} />
        <Route path="/update" element={<UpdateReturnDate />} />
        <Route path="/accinfo" element={<AccInfo />} />
        <Route path="/password-change" element={<PasswordChange />} />
        <Route path="/librarycard" element={<LibraryCard />} />
        <Route path="/extendcard" element={<ExtendCard />} />
        <Route path="/borrowhistory" element={<BorrowHistory />} />
        <Route path="/borrowhistoryuser" element={<BorrowHistoryUser />} />
        <Route path="/borrowbooks" element={<BorrowBooks />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addbook" element={<AddBookForm />} />
        <Route path="/lock" element={<LockAccount />} />
        <Route path="/patronlist" element={<PatronList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;