import  Dashboard  from "./Components/Dashboard";
import Component from "./Components/Component";
import Login from "./Components/Login";
import ForgetPassword from "./Components/test"
import UpdateUserForm from "./Components/test"
import BorrowBookForm from "./Components/test";
import Register from "./Components/Register"
import UpdateReturnDate from "./Components/test";
import Pinfo from "./Components/PersonInfoInsert"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
        <Route path="/update" element={<UpdateReturnDate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;