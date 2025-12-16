import  DashBoard  from "./components/DashBoard";
import Login from "./components/Login";
//import ForgetPassword from "./components/test"
//import UpdateUserForm from "./components/test"
//import BorrowBookForm from "./components/test";
import BorrowBooks from "./components/BorrowBooks"
import Register from "./components/Register"
//import HistoryButton from "./components/test";
//import ListAccountPage from "./components/test";
//import AddBook from "./components/test";
//import AddBanSao from "./components/test";
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
import BorrowHistory from "./components/BorrowHistory";
import BookList from "./components/BookList";
//import type UpdateReturnDate from "./Components/test";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/personal-info-insert" element={<PersonalInfoInsert />} />
        <Route path="/update" element={<UpdateReturnDate />} />
        <Route path="/accinfo" element={<AccInfo />} />
        <Route path="/password-change" element={<PasswordChange />} />
        <Route path="/librarycard" element={<LibraryCard />} />
        <Route path="/extendcard" element={<ExtendCard />} />
        <Route path="/borrowbooks" element={<BorrowBooks />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lock" element={<LockAccount />} />
        <Route path="/patronlist" element={<PatronList />} />
        <Route path="/history-user" element={<BorrowHistoryUser />} />
        <Route path="/librarycard" element={<LibraryCard />} />
        <Route path="/addbook" element={<AddBookForm />} />
        <Route path="/lock" element={<LockAccount />} />
        <Route path="/patronlist" element={<PatronList />} />
        <Route path="/booklist" element={<BookList />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;