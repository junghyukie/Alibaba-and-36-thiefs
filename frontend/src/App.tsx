import  Dashboard  from "./Components/Dashboard";
import Component from "./Components/Component";
import Login from "./Components/Login";
import ForgetPassword from "./Components/test"
import UpdateUserForm from "./Components/test"
import BorrowBookForm from "./Components/test";
import BorrowBooks from "./Components/BorrowBooks"
import Register from "./Components/Register"
import HistoryButton from "./Components/test";
import ListAccountPage from "./Components/test";
import AddBook from "./Components/test";
import AddBanSao from "./Components/test";
import LateListPage from "./Components/test";
import PersonalInfoInsert from "./Components/PersonInfoInsert"
import LibraryCard from "./Components/LibraryCard";
import AddBookForm from "./Components/AddBook";
import AccInfo from "./Components/AccountInfo"; 
import PatronList from "./Components/PatronList";
import LockAccount from "./Components/test";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import type UpdateReturnDate from "./Components/test";





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Component />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/update-user" element={<UpdateUserForm />} />
        <Route path="/reserve" element={<BorrowBookForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/personal-info-insert" element={<PersonalInfoInsert />} />
        {/* <Route path="/update" element={<UpdateReturnDate />} /> */}
        <Route path="/accinfo" element={<AccInfo />} />
        {/* <Route path="/password-change" element={<PasswordChange />} /> */}
        <Route path="/librarycard" element={<LibraryCard />} />
        <Route path="/list-accounts" element={<LateListPage />} />
        {/* <Route path="/extendcard" element={<ExtendCard />} /> */}
        <Route path="/borrowhistory" element={<HistoryButton />} />
        <Route path="/borrowbooks" element={<BorrowBooks />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/add-ban-sao" element={<AddBanSao />} />
         <Route path="/lock" element={<LockAccount />} />
        <Route path="/patronlist" element={<PatronList />} />
        <Route path="/librarycard" element={<LibraryCard />} />
        <Route path="/addbook" element={<AddBookForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;