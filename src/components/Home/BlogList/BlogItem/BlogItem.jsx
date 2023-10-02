import React from 'react';
import { Link } from 'react-router-dom';
import './BlogItem.css';

const BlogItem = ({ post }) => {
  const authorName = post.createdBy ? post.createdBy.surname : 'Unknown'; 
  const createdAt = post.createdBy ? post.createdBy.createdAt : 'Unknown';

  return (
    <div className='blogItem-wrap'>
      <img className='blogItem-cover' src='https://www.blogtyrant.com/wp-content/uploads/2020/03/free-images-for-blog.png' alt='cover' />
      <h3>{post.title}</h3>
      <p className='blogItem-desc'>Created At : {createdAt}</p>
      <footer>
        <div className='blogItem-author'>
        <img src='https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' alt='avatar' />
          <div>
          <h6>{authorName}</h6>
          <p>{post.state}</p>
          </div>
        </div>
        <Link className='blogItem-link' to={`/blog/${post.id}`}>
          ➝
        </Link>
      </footer>
    </div>
  );
};

export default BlogItem;
