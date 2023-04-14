import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../../pages/Login/Login.page';
import Signup from '../../pages/Signup/Signup.component';

const Unauthenticated = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default Unauthenticated;
