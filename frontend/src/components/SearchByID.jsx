import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [summary, setSummary] = useState(''); // State to store the summary
  const [isSummaryVisible, setIsSummaryVisible] = useState(false); // State to toggle summary visibility

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://blog-project-backend-nq7y.onrender.com/api/posts/${id}`);
        console.log(response);
        setPost(response.data);
      } catch (err) {
        console.error('Error fetching post:', err);
      }
    };

    fetchPost();
  }, [id]);

  // Function to handle fetching the summary when the button is pressed
  const fetchSummary = async () => {
    try {
      const response = await axios.get(`https://blog-project-backend-nq7y.onrender.com/api/posts/${id}`);
      setSummary(response.data.summary); // Assuming the summary is sent from the backend
      setIsSummaryVisible(true); // Toggle the visibility of the summary
    } catch (err) {
      console.error('Error fetching summary:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      {post ? (
        <>
          {/* Blog Title */}
          <h1 className="text-4xl font-semibold text-gray-900 mb-6">{post.title}</h1>

          {/* Blog Content */}
          <div className="prose lg:prose-xl text-gray-700 mb-6">
            <p>{post.content}</p>
          </div>

          {/* Date and Author */}
          <div className="text-sm text-gray-500">
            <p className="italic">
              Published on {new Date(post.date).toLocaleString()}
            </p>
          </div>

          {/* Summary Button */}
          <div className="mt-8">
            <button
              onClick={fetchSummary}
              className="inline-block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              {isSummaryVisible ? 'Hide Summary' : 'Show Summary'}
            </button>
          </div>

          {/* Show Summary */}
          {isSummaryVisible && summary && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Summary</h2>
              <p>{summary}</p>
            </div>
          )}

          {/* Back to All Posts Link */}
          <div className="mt-8">
            <a
              href="/"
              className="inline-block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Back to All Postss
            </a>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogDetails;
