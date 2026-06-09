import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../src/Containers/Pages/login";
import Register from "../src/Containers/Pages/Register";
import Dashboard from "../src/Containers/Pages/Dashboard";
import Employees from "../src/Containers/Pages/employees";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </Router>
  );
}

export default App;
