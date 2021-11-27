import React from "react";
import "./App.css";
import Dashboard from "./features/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
