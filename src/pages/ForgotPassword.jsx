// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSendOtp = () => {
    // 🔹 Later: integrate Firebase or backend OTP service
    alert(`OTP sent to ${email}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }

    // 🔹 Later: integrate Firebase updatePassword()
    console.log("Email:", email);
    console.log("New Password:", newPassword);
    alert("Password reset successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-2 font-medium" htmlFor="email">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Send OTP */}
          <button
            type="button"
            onClick={handleSendOtp}
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Send OTP
          </button>

          {/* New Password */}
          <div>
            <label className="block mb-2 font-medium" htmlFor="new_password">
              Enter New Password
            </label>
            <input
              type="password"
              id="new_password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              className="block mb-2 font-medium"
              htmlFor="confirm_new_password"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm_new_password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Reset Password */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Reset Password
          </button>
        </form>

        {/* Links */}
        <p className="mt-6 text-center text-sm">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
          <br />
          <br />
          No account yet?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
