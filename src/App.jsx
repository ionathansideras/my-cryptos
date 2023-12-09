// Import necessary components from your project
import Home from "./components/homePages/Home.jsx";
import Login from "./components/authPages/Login.jsx";
import Register from "./components/authPages/Register.jsx";
import PasswordReset from "./components/authPages/PasswordReset.jsx";
import WelcomePage from "./components/welcomePages/WelcomePage.jsx";
import EmailVerification from "./components/authPages/EmailVerification.jsx";
import CoinDetail from "./components/detailsPages/CoinDetail.jsx";
// Import necessary modules from react-router-dom
import { HashRouter, Routes, Route } from "react-router-dom";

// Import styles
import "./styles/loader.css";

// Main App component
function App() {
  return (
    // Use HashRouter as the main router
    <HashRouter>
      {/* Define routes using the Routes component */}
      <Routes>
        {/* Each Route component maps a URL path to a specific component */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        {/* Add a dynamic route for CryptoDetail */}
        <Route path="/coin/:symbol" element={<CoinDetail />} />
      </Routes>
    </HashRouter>
  );
}

// Export the App component as the default export
export default App;
