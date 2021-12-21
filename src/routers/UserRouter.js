import { Routes, Route, Navigate } from 'react-router-dom';
import BlogsList from '../components/blog/BlogsList';
import Blog from '../components/blog/Blog';
import Create from '../components/blog/Create';
import Edit from '../components/blog/Edit';

const UserRouter = () => (
  <Routes>
    <Route path="/" element={<BlogsList />} />
    <Route path="/blog/:blogId" element={<Blog />} />
    <Route path="/create" element={<Create />} />
    <Route path="/edit" element={<Edit />} />
    <Route path="*" element={<Navigate replace to="/" />} />
  </Routes>
);

export default UserRouter;
