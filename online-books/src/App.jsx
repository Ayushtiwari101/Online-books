import React from 'react'
import './App.css'
import HomePage from './components/HomePage'
import RegistrationForm from './components/RegistrationForm'
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
