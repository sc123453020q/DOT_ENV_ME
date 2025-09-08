import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/forgot_password.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSendOtp = () => {
    // Example action: send OTP
    alert(`OTP sent to ${email}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Example action: reset password
    console.log("Email:", email);
    console.log("New Password:", newPassword);
    alert("Password reset successfully!");
  };

  return (
   <div className="page-container">
      <header className="logo-header">
      </header>
      <main>
        <form onSubmit={handleSubmit} className = "myForm">
          <div className="container">
            <h2 className="text-center">Forgot Password</h2>
          </div>

          <div className="container">
            <label htmlFor="email">
              <b>Email id</b>
            </label>
            <input
              type="email"
              placeholder="Enter your Email id"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="container">
            <button type="button" className="verifybtn" onClick={handleSendOtp}>
              Send OTP
            </button>
          </div>

          <div className="container">
            <label htmlFor="new_password">
              <b>Enter New Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter New Password"
              id="new_password"
              name="new_password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="container">
            <label htmlFor="confirm_new_password">
              <b>Confirm New Password</b>
            </label>
            <input
              type="password"
              placeholder="Confirm New Password"
              id="confirm_new_password"
              name="confirm_new_password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="container">
            <button type="submit">Reset Password</button>
          </div>

          <div className="login">
            <span className="sign_in">
              Remember your password? <Link to="/">Sign in</Link><br /><br />
              No account yet? <Link to= "/register">Register</Link>
            </span>
          </div>
        </form>
      </main>
      <footer className="text-center">
      </footer>
    </div>
  );
}