import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* MAIN */}
        <Route path="/home" element={<Home />} />

        {/* BLOG */}
        <Route path="/blogs/:id" element={<BlogDetails />} />

        {/* PROFILE */}
        <Route path="/profile/:id" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
