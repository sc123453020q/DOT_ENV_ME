// src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import logo2 from "../assets/logo2.png";
import regBg from "../assets/reg_bg.png"; // ✅ import your background image

export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [instituteType, setInstituteType] = useState("nothing");
  const [schoolName, setSchoolName] = useState("");
  const [schoolClass, setSchoolClass] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [collegeCourse, setCollegeCourse] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        gender,
        instituteType,
        ...(instituteType === "school"
          ? { schoolName, schoolClass }
          : instituteType === "college"
          ? { collegeName, collegeCourse }
          : {}),
        phone,
        email,
        createdAt: new Date(),
      });

      console.log("✅ Registration successful, redirecting...");
      navigate("/home", { replace: true }); // 🔥 force redirect
    } catch (err) {
      console.error("❌ Registration Error:", err);
      setError(err.message || "Failed to create account. Try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-30 relative overflow-hidden bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${regBg})` }}
    >
      {/* Left Logo Section */}
      <div className="hidden md:flex w-8/3 items-center justify-center">
        <img src={logo2} alt="Logo" className="w-80 animate-floating" />
      </div>

      {/* Right Content Box */}
      <div className="w-5/3 flex items-left justify-left">
        <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-lg w-full">
          <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">
            Register
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* First Name */}
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />

            {/* Last Name */}
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />

            {/* Gender */}
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {/* Institute Type */}
            <select
              value={instituteType}
              onChange={(e) => setInstituteType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="nothing">Select institute type</option>
              <option value="school">School</option>
              <option value="college">College</option>
            </select>

            {/* Conditional Fields */}
            {instituteType === "school" && (
              <>
                <input
                  type="text"
                  placeholder="School Name"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="text"
                  placeholder="Class"
                  value={schoolClass}
                  onChange={(e) => setSchoolClass(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
              </>
            )}

            {instituteType === "college" && (
              <>
                <input
                  type="text"
                  placeholder="College Name"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="text"
                  placeholder="Course"
                  value={collegeCourse}
                  onChange={(e) => setCollegeCourse(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
                />
              </>
            )}

            {/* Phone */}
            <input
              type="number"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />

            {/* Hidden button to allow Enter key submit */}
            <button type="submit" style={{ display: "none" }}></button>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Links */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
            <br />
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>

      {/* Floating Animation Styles */}
      <style>
        {`
          @keyframes floating {
            0% { transform: translateY(0px); }
            70% { transform: translateY(-50px); }
            100% { transform: translateY(0px); }
          }
          .animate-floating {
            animation: floating 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
