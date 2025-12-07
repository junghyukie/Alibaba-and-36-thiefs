import  Dashboard  from "./Components/Dashboard";
import Component from "./Components/Component";
import Login from "./Components/Login";
import BorrowBooks from "./Components/BorrowBooks"
import Register from "./Components/Register"
import PersonalInfoInsert from "./Components/PersonInfoInsert"
import LibraryCard from "./Components/LibraryCard";
import AddBookForm from "./Components/AddBook";
import AccInfo from "./Components/AccountInfo"; 
import PatronList from "./Components/PatronList";
import LockAccount from "./Components/test";
import BorrowHistory from "./Components/BorrowHistory";
import BorrowHistoryUser from "./Components/BorrowHistoryUser";
import PasswordChange from "./Components/PasswordChange";
import ExtendCard from "./Components/ExtendCard";
import UpdateReturnDate from "./Components/UpdateReturnDate";
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