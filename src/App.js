import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Contact from "./pages/contact";
import NotFound from "./pages/error/NotFound";
import Home from "./pages/home";
import Portfolio from "./pages/portfolio";
import Project from "./pages/project";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/portfolio" element={<Portfolio />} />
        <Route exact path="/project" element={<Project />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
