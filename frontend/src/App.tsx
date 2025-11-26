import  Dashboard  from "./Components/Dashboard";
import Component from "./Components/Component";
import Login from "./Components/Login";
import ForgetPassword from "./Components/test"
import UpdateUserForm from "./Components/test"
import BorrowBookForm from "./Components/test";
import BorrowBooks from "./Components/BorrowBooks"
import Register from "./Components/Register"
import UpdateReturnDate from "./Components/test";
import Pinfo from "./Components/PersonInfoInsert"
import LibraryCard from "./Components/LibraryCard";
import AddBookForm from "./Components/AddBook";
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
        <Route path="/borrow" element={<BorrowBookForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pinfo" element={<Pinfo />} />
        <Route path="/accinfo" element={<AccInfo />} />
        <Route path="/update" element={<UpdateReturnDate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;