import  Dashboard  from "./components/Dashboard";
import Component from "./components/Component";
import Login from "./components/Login";
//import ForgetPassword from "./components/test"
//import UpdateUserForm from "./components/test"
//import BorrowBookForm from "./components/test";
import BorrowBooks from "./components/BorrowBooks"
import Register from "./components/Register"
//import HistoryButton from "./components/test";
//import ListAccountPage from "./components/test";
import AddBook from "./components/test";
import AddBanSao from "./components/test";
//import LateListPage from "./components/test";
import PersonalInfoInsert from "./components/PersonInfoInsert"
import LibraryCard from "./components/LibraryCard";
import AddBookForm from "./components/AddBook";
import AccInfo from "./components/AccountInfo"; 
import PatronList from "./components/PatronList";
import LockAccount from "./components/test";
import BorrowHistoryUser from "./components/BorrowHistoryUser";
import UpdateReturnDate from "./components/UpdateReturnDate";
import PasswordChange from "./components/PasswordChange";
import ExtendCard from "./components/ExtendCard";
import TopBook from "./components/test";
import CopyListTest from "./components/test";
import BorrowHistory from "./components/BorrowHistory";
//import type UpdateReturnDate from "./Components/test";

import { BrowserRouter, Routes, Route } from 'react-router-dom';




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
        <Route path="/add" element={<AddBook />} />
        <Route path="/add-ban-sao" element={<AddBanSao />} />
         <Route path="/lock" element={<LockAccount />} />
        <Route path="/patronlist" element={<PatronList />} />
        <Route path="/history-user" element={<BorrowHistoryUser />} />
        <Route path="/librarycard" element={<LibraryCard />} />
        <Route path="/addbook" element={<AddBookForm />} />
        <Route path="/lock" element={<LockAccount />} />
           <Route path="/copies" element={<CopyListTest />} />
         <Route path="/top-book" element={<TopBook />} />
        <Route path="/patronlist" element={<PatronList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;