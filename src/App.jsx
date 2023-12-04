import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import PasswordReset from "./components/PasswordReset.jsx";
import WelcomePage from "./components/WelcomePage.jsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./styles/loader.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<PasswordReset />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
