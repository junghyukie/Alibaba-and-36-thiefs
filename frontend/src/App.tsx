// import  Dashboard  from "./components/Dashboard";
import Component from "./components/Component";
import Login from "./components/Login";
import Pinfo from "./Components/PersonInfoInsert";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Component />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pinfo" element={<Pinfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;