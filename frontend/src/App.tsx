import  Dashboard  from "./Components/Dashboard";
import Component from "./Components/Component";
import Login from "./Components/Login";
import ForgetPassword from "./Components/test"
import Test from "./Components/test"
import Register from "./Components/Register"
import Pinfo from "./Components/PersonInfoInsert"
import AccInfo from "./Components/AccountInfo"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Component />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/test" element={<Test />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pinfo" element={<Pinfo />} />
        <Route path="/accinfo" element={<AccInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;