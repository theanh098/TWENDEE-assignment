import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./components/Table";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/page/:index" element={<Table />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
