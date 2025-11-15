import  Dashboard  from "./Components/Dashboard";
import Component from "./Components/Component";
import Login from "./Components/Login";
//import ForgetPassword from "./Components/test";
import UpdateReturnDate from "./Components/test"; 
import Register from "./Components/Register";
import Pinfo from "./Components/PersonInfoInsert";
//import UpdateReturnDate from "./Components/UpdateReturnDate";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import type UpdateReturnDate from "./Components/test";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Component />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/forgetpassword" element={<ForgetPassword />} /> */}
        <Route path="/test" element={<UpdateReturnDate />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pinfo" element={<Pinfo />} />
        {/* <Route path="/update-return" element={<UpdateReturnDate />} /> */}
        

        

      </Routes>
    </BrowserRouter>
  );
}

export default App;