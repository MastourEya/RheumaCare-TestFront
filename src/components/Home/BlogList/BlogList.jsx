import React, { useState,useEffect } from 'react';
import BlogItem from './BlogItem/BlogItem';
import './BlogList.css';
import axios from 'axios'; 

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://tt-front.duplessy.eu/api/posts?page=1', {
      headers: {
        'accept': 'application/json'
      }
    })
    .then(response => {
      setPosts(response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des posts :', error);
    });
  }, []);
  return (
    <div className='blogList-wrap'>
    {posts.map((post) => (
      <BlogItem key={post.id} post={post} />
    ))}
  </div>
  );
};

export default BlogList;