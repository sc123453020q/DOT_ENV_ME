import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/register.css";

export default function Register() {
  const [logoTop, setLogoTop] = useState(window.innerHeight / 2); // start centered

  useEffect(() => {
    const handleScroll = () => {
      // always take the middle of the viewport
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      setLogoTop(viewportCenter);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once at start

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
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
      password,
    };

    console.log("Form Submitted:", formData);
    alert("Account created successfully!");
  };

  return (
    <div className="page-container">
      {/* Logo in top-left */}
      <header className="logo-header" style={{ top: `${logoTop}px` }}>
        <div className="logo-container">
          <img src="/mascot.png" alt="Mascot" className="logo-mascot" />
          <img src="/logo-text.png" alt="Logo Text" className="logo-text" />
        </div>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="container">
            <h2 style={{ textAlign: "center" }}>Register</h2>
          </div>

          {/* First Name */}
          <div className="container">
            <label htmlFor="first_name">
              <b>First Name</b>
            </label>
            <input
              type="text"
              id="first_name"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Last Name */}
          <div className="container">
            <label htmlFor="last_name">
              <b>Last Name</b>
            </label>
            <input
              type="text"
              id="last_name"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Gender */}
          <div className="container">
            <label htmlFor="gender">Gender</label><br /><br />
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "8px" }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Institute Type */}
          <div className="container">
            <label htmlFor="institute_select">Institute Type</label><br /><br />
            <select
              id="institute_select"
              value={instituteType}
              onChange={(e) => setInstituteType(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "8px" }}
            >
              <option value="nothing">Select institute type</option>
              <option value="school">School</option>
              <option value="college">College</option>
            </select>
          </div>

          {/* Conditional Fields */}
          {instituteType === "school" && (
            <>
              <div className="container">
                <label htmlFor="schoolName">School Name</label>
                <input
                  type="text"
                  id="schoolName"
                  placeholder="Enter your school name"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  required
                />
              </div>
              <div className="container">
                <label htmlFor="schoolClass">Class</label>
                <input
                  type="text"
                  id="schoolClass"
                  placeholder="Enter your class"
                  value={schoolClass}
                  onChange={(e) => setSchoolClass(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {instituteType === "college" && (
            <>
              <div className="container">
                <label htmlFor="collegeName">College Name</label>
                <input
                  type="text"
                  id="collegeName"
                  placeholder="Enter your college name"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  required
                />
              </div>
              <div className="container">
                <label htmlFor="collegeCourse">Course</label>
                <input
                  type="text"
                  id="collegeCourse"
                  placeholder="Enter your course"
                  value={collegeCourse}
                  onChange={(e) => setCollegeCourse(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {/* Phone Number */}
          <div className="container">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="number"
              id="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="container">
            <label htmlFor="email">Email id</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <div className="container">
            <button type="submit">Register</button>
          </div>

          {/* Link back to login */}
          <div className="sign">
            <span className="sign_in">
              Already have an account? <Link to="/">Sign in</Link><br /><br />
              Forgot password? <Link to= "/forgot_password">Reset your password</Link>
            </span>
          </div>
        </form>
      </main>
      <footer style={{ textAlign: "center" }}>
      </footer>
    </div>
  );
}
