import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/tasks" element={<TasksPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
