import Home from "./components/homePages/Home.jsx";
import Login from "./components/authPages/Login.jsx";
import Register from "./components/authPages/Register.jsx";
import PasswordReset from "./components/authPages/PasswordReset.jsx";
import WelcomePage from "./components/welcomePages/WelcomePage.jsx";
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
