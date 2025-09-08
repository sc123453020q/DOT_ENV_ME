import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./components/register";
import ForgotPassword from "./components/forgot_password";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Register/>} />

        {/* Other pages */}
        <Route path = "/register" element={<Register />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
