import React, { useState } from 'react';
import axios from 'axios';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://blog-project-backend-nq7y.onrender.com/api/posts', {
        title,
        content,
      });
      console.log('Post created:', response.data);
      alert('Blog created successfully!');
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Error creating blog!');
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-4 bg-red-100 mt-10 rounded-3xl'>
        <div className=''>
      <h1 className='text-3xl font-semiboldn mb-4'>Create a New Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className=" text-lg" >Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="text-lg">  Content</label>
          <textarea
            value={content}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="10"
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-fuchsia-600 mt-4" >Submit</button>
      </form>
      </div>
    </div>
  );
};

export default BlogForm;
