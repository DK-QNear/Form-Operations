import React from 'react';
import Form from './components/Form';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MyBookings from './components/MyBookings';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
     <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/form" element={<Form />} />
        <Route path="/mybookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
