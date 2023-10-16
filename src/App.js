import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import ExplorePage from "./pages/Explore";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Offers from "./pages/Offers";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import React from 'react';
import Category from "./pages/Category";
import CreateListing from "./pages/CreateListing";

function App() {
  return (
    <>
      <Router>
        <div>
          <main className="contianer mx-auto px-3 pb-12">
            <Routes>
              <Route path="/" element={<ExplorePage />} />
              <Route path="/profile" element={<PrivateRoute />} >
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/offer" element={<Offers />} />
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </main>

          <Navbar />
        </div>
      </Router>

      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
