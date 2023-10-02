import React, { useState } from 'react';
import EmptyList from '../../components/common/EmptyList/EmptyList';
import BlogList from '../../components/Home/BlogList/BlogList';
import Header from '../../components/Home/Header/Header';
import AddPost from '../../components/Home/AddPost/AddPost'; 
import { blogList } from '../../config/data';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState(blogList);
  const [searchKey, setSearchKey] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleCreatePost = async (newPost) => {
    try {
      const response = await axios.post('https://tt-front.duplessy.eu/api/posts', newPost, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwtToken'), 
        },
      });

      const createdPost = response.data;

      setPosts([...posts, createdPost]);

      navigate(`/blog/${createdPost.id}`);
    } catch (error) {
      console.error('Error creating a new post:', error);
    }
  };

  return (
    <div>
      
      <Header />
      <AddPost onPostCreate={handleCreatePost} isLoggedIn={isLoggedIn} />
      {!posts.length ? <EmptyList /> : <BlogList />}
    </div>
  );
};

export default Home;
