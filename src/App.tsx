import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/sdibar";
import Appliances from "./pages/siniflar";

const App = () => {
  return (
    <Router>
      <div className="">
        <Sidebar />
      </div>
    </Router>
  );
};

export default App;
