import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/home.jsx"
import Select from "./components/select.jsx"
import Display from "./components/display.jsx"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select" element={<Select />} />
          <Route path="/display" element={<Display />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
