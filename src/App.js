import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import  Main from "./components/Main";
import  Stock  from "./components/Stock";
import { Register } from "./components/Register";
import { Login } from "./components/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    // If the user is logged in, set the `isLoggedIn` state to true
    // Otherwise, set the `isLoggedIn` state to false
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/dashboard" element={<Stock/>} />
        <Route path="/register" element={ <Register/>} />
        <Route path="/login" element={ <Login/>} />
        <Route path="*" element={<Main/>} />

      </Routes>
    </Router>
  );
};

export default App;