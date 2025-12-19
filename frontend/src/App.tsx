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
// import LockAccount from "./components/test";
import BorrowHistoryUser from "./components/BorrowHistoryUser";
import UpdateReturnDate from "./components/UpdateReturnDate";
import PasswordChange from "./components/PasswordChange";
import ExtendCard from "./components/ExtendCard";
// import TopBook from "./components/test";
// import CopyListTest from "./components/test";
import BookList from "./components/BookList";
// import DeleteBook from "./components/test";
import Dashboard from "./components/Dashboard";
//import type UpdateReturnDate from "./Components/test";
// import NotificationListStaff from "./components/NotificationStaff";
// import NotificationListUser from "./components/NotificationUser";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PatronBorrowPage from "./components/PatronBorrowPage";
import FineHistoryUser from "./components/FineHistoryUser";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/personal-info-insert" element={<PersonalInfoInsert />} />
        <Route path="/update" element={<UpdateReturnDate />} />
        <Route path="/accinfo" element={<AccInfo />} />
        <Route path="/password-change" element={<PasswordChange />} />
        <Route path="/librarycard" element={<LibraryCard />} />
        <Route path="/extendcard" element={<ExtendCard />} />
        <Route path="/borrowbooks" element={<BorrowBooks />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/lock" element={<LockAccount />} /> */}
        <Route path="/patronlist" element={<PatronList />} />
        <Route path="/history-user" element={<BorrowHistoryUser />} />
        <Route path="/librarycard" element={<LibraryCard />} />
        <Route path="/addbook" element={<AddBookForm />} />
        {/* <Route path="/notice-staff" element={<NotificationListStaff />} /> */}
        {/* <Route path="/copies" element={<CopyListTest />} /> */}
        {/* <Route path="/top-book" element={<TopBook />} /> */}
        <Route path="/patronlist" element={<PatronList />} />
        <Route path="/booklist" element={<BookList />} />
        <Route path="/patron/:userId/borrow" element={<PatronBorrowPage />} />
        <Route path="/user/fines" element={<FineHistoryUser />} />

        {/* <Route path="/notice-user" element={<NotificationListUser />} /> */}
      </Routes>
    </BrowserRouter>
  );

}

export default App;