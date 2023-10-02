import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import EmptyList from '../../components/common/EmptyList/EmptyList';
import './Blog.css';

const Blog = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`https://tt-front.duplessy.eu/api/posts/${id}`, {
      headers: {
        'accept': 'application/json'
      }
    })
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching blog post:', error);
      });
  }, [id]);

  return (
    <>
      <Link className='blog-goBack' to='/home'>
        <span> &#8592;</span> <span>Go Back</span>
      </Link>
      {post ? (
        <div className='blog-wrap'>
          <header>
            <h1>{post.title}</h1>
          </header>
          <img src='https://www.blogtyrant.com/wp-content/uploads/2020/03/free-images-for-blog.png' alt='cover' />
          <p className='blog-desc'>{post.description}</p>
          <div className='footer'>
            {post.createdBy && (
              <div className='blogItem-author'>
                <img src='https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' alt='avatar' />

                Author: {post.createdBy.surname}</div>

            )}
            <p className='blog-date'>Created At : {post.createdAt}</p>
          </div>

        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Blog;
