import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './posts.css';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const token = localStorage.getItem('jwtToken');
  localStorage.getItem('jwtToken')
  const axiosInstance = axios.create({
    baseURL: 'https://tt-front.duplessy.eu/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  useEffect(() => {
    axiosInstance.get('/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  },  [axiosInstance]);
  
  useEffect(() => {
    axios.get('https://tt-front.duplessy.eu/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.body) {
      alert('Please fill in both title and content fields.');
      return;
    }

    axios.post('https://tt-front.duplessy.eu/api/posts', newPost)
      .then((response) => {
        setPosts([...posts, response.data]);
        setNewPost({ title: '', body: '' });
        
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  };

  const handleDeletePost = async (postId) => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      await axios.delete(`https://tt-front.duplessy.eu/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        
      });

      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
      
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.state}</td>
              <td className='buttons'>
                <button className="edit-button">Edit</button>
                <button className="delete-button" onClick={() => handleDeletePost(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Create New Post</h2>
      <div>
        <input
          placeholder='Title'
          type="text"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
      </div>
      <div>
        <textarea
          placeholder='Body'
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
      </div>
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
}

export default Posts;
