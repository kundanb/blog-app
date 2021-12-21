import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/user/Login';
import Signup from '../components/user/Signup';

const GuestRouter = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/" element={<Navigate to="/signup" />} />
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default GuestRouter;
