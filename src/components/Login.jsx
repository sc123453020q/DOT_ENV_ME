// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import the auth we exported from App.jsx
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import bgImage from "../assets/education.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔹 Regular login handler (dummy)
  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "test@example.com" && password === "1234") {
      navigate("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  // 🔹 Google Sign-In handler
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      console.log("User Info:", result.user); // You get name, email, photo here
      navigate("/home"); // Redirect after login
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
          LOG IN
        </h2>

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
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Submit
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500">OR</div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 mt-4">
          <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
            <i className="fab fa-facebook-f"></i>
          </button>

          {/* ✅ Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
          >
            <i className="fab fa-google"></i>
          </button>

          <button className="bg-sky-400 text-white p-2 rounded-full hover:bg-sky-500">
            <i className="fab fa-twitter"></i>
          </button>
        </div>

        {/* Links */}
        <div className="mt-6 text-center text-sm">
          <p>
            No account yet?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}
