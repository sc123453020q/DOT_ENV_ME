import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import logo1 from "../assets/logo1.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to home, replacing the login page in history
      navigate("/home", { replace: true });
    } catch (err) {
      console.error("Login Error:", err.message);
      setError(err.message); // show actual Firebase error
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="absolute -inset-40 z-0 watermark"></div>

      <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
          LOG IN
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Submit
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center text-sm">
          <p>
            No account yet?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot your password?
          </Link>
        </div>
      </div>

      <style>
        {`
          .watermark {
            position: absolute;
            top: -200px;
            left: -200px;
            right: -200px;
            bottom: -200px;
            background-image: url(${logo1});
            background-size: 280px;
            background-repeat: repeat;
            background-position: center;
            opacity: 0.12;
            transform: rotate(-30deg);
            pointer-events: none;
            user-select: none;
          }
        `}
      </style>
    </div>
  );
}
