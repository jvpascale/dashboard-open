import React from 'react';
import Carteira from './components/Carteira/index.jsx';
import Home from './components/Home/home.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carteira/*" element={<Carteira />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
