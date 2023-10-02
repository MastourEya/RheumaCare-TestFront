import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddPost.css'

const AddPost = ({ isAuthenticated, onPostCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    if (!isAuthenticated) {
      alert('Please log in to create a post.');
      navigate('/login'); 
      return;
    }

    if (title.trim() === '' || content.trim() === '') {
      alert('Title and content cannot be empty.');
      return;
    }

    const newPost = {
      title: title,
      content: content,
      createdAt: new Date().toLocaleString(),
    };

    try {
      const token = localStorage.getItem('jwtToken'); 
      const response = await axios.post(
        'https://tt-front.duplessy.eu/api/posts',
        newPost,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      const createdPost = response.data;

      if (onPostCreate) {
        onPostCreate(createdPost);
      }

      setTitle('');
      setContent('');

      console.log('Post created successfully:', createdPost);
    } catch (error) {
      console.error('Error creating a new post:', error);
    }
  };

  return (
    <div className='addPost-wrap'>
      {/* <h2>Create a New Post</h2>
      <div>
        <label>Title:</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div> */}
      <button className='buttonadd' onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};

export default AddPost;
