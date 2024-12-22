import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [postsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
        setVisiblePosts(response.data.slice(0, postsPerPage));
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
      setVisiblePosts(visiblePosts.filter((post) => post._id !== id));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const handleReadMore = (id) => {
    navigate(`/posts/${id}`); // Navigate to the detailed blog page
  };

  const loadMorePosts = () => {
    const nextPosts = posts.slice(visiblePosts.length, visiblePosts.length + postsPerPage);
    setVisiblePosts([...visiblePosts, ...nextPosts]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">All Blog Posts</h1>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <ul className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <li key={post._id} className="border-b pb-4">
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <p className="text-gray-700">
                {post.content.length > 400
                  ? `${post.content.slice(0, 400)}...`
                  : post.content}
              </p>
              <p className="text-sm text-gray-500">
                <em>{new Date(post.date).toLocaleString()}</em>
              </p>

              {/* Read More, Edit, and Delete buttons */}
              <div className="flex space-x-4 mt-2">
                <button
                  onClick={() => handleReadMore(post._id)}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Read More
                </button>
                <button
                  onClick={() => console.log(`Edit post with id: ${post._id}`)}
                  className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </ul>

      {/* Load More Button */}
      {filteredPosts.length < posts.length && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMorePosts}
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            See All Blogs
          </button>
        </div>
      )}

      {/* Create New Blog Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/create')}
          className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
        >
          Create New Blog
        </button>
      </div>
    </div>
  );
};

export default BlogList;
