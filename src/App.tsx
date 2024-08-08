import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/sidebar";
import Dashboard from "./pages/dashbo";
import Cost from "./pages/cost";
import Appliances from "./pages/aplicanse";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cost" element={<Cost />} />
            <Route path="/appliances" element={<Appliances />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
