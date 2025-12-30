// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Register from "./Components/Register";
// import Login from "./Components/Login";
// import Emailverification from "./Components/Emailverification";
// import Forgot from "./Components/Forgot";
// import ResetPW from "./Components/ResetPW";
// import ChangePW from "./Components/ChangePW";
// import Dashbord from "./Components/Dashbord";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/Emailverification" element={<Emailverification />} />
//         <Route path="/forgot" element={<Forgot />} />
//         <Route path="/resetPW" element={<ResetPW />} />
//         <Route path="/changePW" element={<ChangePW />} />
//         <Route path="/tasks" element={<Dashbord />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }






// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Register from "./Components/Register";
// import Login from "./Components/Login";
// import Emailverification from "./Components/Emailverification";
// import Forgot from "./Components/Forgot";
// import ResetPW from "./Components/ResetPW";
// import ChangePW from "./Components/ChangePW";
// import Dashbord from "./Components/Dashbord";
// import Tasks from "./pages/Tasks";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Login routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />

//         <Route path="/register" element={<Register />} />
//         <Route path="/Emailverification" element={<Emailverification />} />
//         <Route path="/forgot" element={<Forgot />} />
//         <Route path="/resetPW" element={<ResetPW />} />
//         <Route path="/changePW" element={<ChangePW />} />
//         <Route path="/tasks" element={<Dashbord />} />

//         {/* 🔒 JWT protected page */}
//         <Route path="/tasks" element={<Tasks />} />

//         {/* fallback */}
//         <Route path="*" element={<Login />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }






import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./Components/Register";
import Login from "./Components/Login";
import Emailverification from "./Components/Emailverification";
import Forgot from "./Components/Forgot";
import ResetPW from "./Components/ResetPW";
import ChangePW from "./Components/ChangePW";
import Dashbord from "./Components/Dashbord";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Email verification (TOKEN REQUIRED) */}
        <Route
          path="/Emailverification/:token"
          element={<Emailverification />}
        />

        {/* Forgot & Reset */}
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetPW/:token" element={<ResetPW />} />

        {/* Change password (JWT protected) */}
        <Route path="/changePW" element={<ChangePW />} />

        {/* Dashboard */}
        <Route path="/tasks" element={<Dashbord />} />

        {/* fallback */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

