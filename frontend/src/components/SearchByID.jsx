import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        console.log(response);
        setPost(response.data);
      } catch (err) {
        console.error('Error fetching post:', err);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-orange-50 rounded-lg shadow-md mt-8">
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

          {/* Back to All Posts Link */}
          <div className="mt-8">
            <a
              href="/"
              className="inline-block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Back to All Posts
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
