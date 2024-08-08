import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/sdibar";
import Dashboard from "./pages/dashbo";
import Cost from "./pages/cost";
import Appliances from "./pages/aplicanse";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        
      </div>
    </Router>
  );
};

export default App;
