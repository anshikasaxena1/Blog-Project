import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInput from './components/UserInput'
import AllBlogs from './components/AllBlogs'
import SearchById from './components/SearchByID'
import BlogDetails from './components/SearchByID';
import EditBlog from './components/EditBlog';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllBlogs />} />
        <Route path="/create" element={<UserInput />} />
        
        <Route path="/post/:id" element={<SearchById />} />
        <Route path="/posts/edit/:id" element={<EditBlog />} />
        <Route path="/posts/:id" element={<BlogDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
