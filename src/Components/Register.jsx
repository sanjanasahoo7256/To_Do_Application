// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();

//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleRegister = () => {
//     // ❌ Validation
//     if (!user.username || !user.email || !user.password) {
//       alert("All fields are required");
//       return;
//     }

//     // 📦 Get existing users
//     const users = JSON.parse(localStorage.getItem("users")) || [];

//     // ❌ Check if email already exists
//     const existingUser = users.find((u) => u.email === user.email);

//     if (existingUser) {
//       alert("User already exists. Please login.");
//       navigate("/");
//       return;
//     }

//     // ✅ Add new user
//     users.push(user);

//     // 💾 Save to localStorage
//     localStorage.setItem("users", JSON.stringify(users));

//     // 🔁 Redirect to Email Verification
//     navigate("/Emailverification");
//   };

//   return (
//     <div className="container">
//       <h2>Register</h2>

//       <input
//         placeholder="Username"
//         onChange={(e) => setUser({ ...user, username: e.target.value })}
//       />

//       <input
//         placeholder="Email"
//         onChange={(e) => setUser({ ...user, email: e.target.value })}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setUser({ ...user, password: e.target.value })}
//       />

//       <button onClick={handleRegister}>Register</button>

//       {/* Already Account */}
//       <div className="link" onClick={() => navigate("/")}>
//         Already have an account? Login
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleRegister = async () => {
//     setError("");

//     // Frontend validation
//     if (!form.username || !form.email || !form.password) {
//       setError("All fields are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       // ✅ Backend call (REAL registration)
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         form
//       );

//       // ✅ Registration succeeded ONLY if backend says so
//       if (response.status === 201) {
//         navigate("/Emailverification");
//       }
//     } catch (err) {
//       // ❌ Backend failed → NO registration
//       setError(
//         err.response?.data?.message ||
//           "Registration failed. Backend not connected."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>User Registration</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <input
//         type="text"
//         placeholder="Username"
//         value={form.username}
//         onChange={(e) => setForm({ ...form, username: e.target.value })}
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//       />

//       <button onClick={handleRegister} disabled={loading}>
//         {loading ? "Registering..." : "Register"}
//       </button>

//       <p
//         style={{ cursor: "pointer", color: "blue" }}
//         onClick={() => navigate("/")}
//       >
//         Already have an account? Login
//       </p>
//     </div>
//   );
// }




// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleRegister = async () => {
//     setError("");

//     // ✅ Frontend validation
//     if (!form.username || !form.email || !form.password) {
//       setError("All fields are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       // ✅ CORRECT backend URL (ngrok or localhost)
//       const response = await axios.post(
//         "https://YOUR_NGROK_URL/register", // 🔴 change this
//         {
//           username: form.username,
//           email: form.email,
//           password: form.password,
//         }
//       );

//       // ✅ Backend success
//       if (response.status === 201) {
//         alert("Verification email sent. Please check your inbox.");
//         navigate("/Emailverification");
//       }
//     } catch (err) {
//       // ✅ Correct error handling
//       setError(
//         err.response?.data?.error ||
//           "Registration failed. Backend not connected."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>User Registration</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <input
//         type="text"
//         placeholder="Username"
//         value={form.username}
//         onChange={(e) => setForm({ ...form, username: e.target.value })}
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//       />

//       <button onClick={handleRegister} disabled={loading}>
//         {loading ? "Registering..." : "Register"}
//       </button>

//       <p
//         style={{ cursor: "pointer", color: "blue" }}
//         onClick={() => navigate("/login")}
//       >
//         Already have an account? Login
//       </p>
//     </div>
//   );
// }









import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setError("");
    setMessage("");

    // ✅ Frontend validation
    if (!form.username || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      // ✅ Correct backend URL
      const response = await axios.post(
        "https://terrorful-avah-bluishly.ngrok-free.dev/register", // 🔴 change to your ngrok
        {
          username: form.username,
          email: form.email,
          password: form.password,
        }
      );

      // ✅ Backend success
      if (response.status === 201) {
        setMessage(
          "Verification email sent. Please check your inbox and click the link."
        );
        setTimeout(() => navigate("/login"), 3000); // redirect after 3 sec
      }
    } catch (err) {
      // ✅ Correct error handling
      setError(
        err.response?.data?.error ||
          "Registration failed. Backend not connected."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>User Registration</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => navigate("/login")}
      >
        Already have an account? Login
      </p>
    </div>
  );
}
