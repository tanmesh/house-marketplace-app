import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ExplorePage from "./pages/Explore";
import Navbar from "./layout/Navbar";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import React from 'react';

function App() {
  return (
    <>
      <Router>
        <div>

          <main className="contianer mx-auto px-3 pb-12">
            <Routes>
              <Route path="/" element={<ExplorePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/offer" element={<Offers />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </main>

          <Navbar />
        </div>
      </Router>

      <ToastContainer autoClose={3000}/>
    </>
  );
}

export default App;
