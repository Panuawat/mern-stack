import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'; // Import useParams hook
import Navbar from './Navbar';
import parse from 'html-react-parser';

function SingleComponent() {
  const [blog, setBlog] = useState('')

  /*
    เราสามารถใช้ useParams hook มาช่วยในการดึงค่า params จาก URL ได้โดยตรง 
    ต่อไปนี้คือวิธีการใช้ useParams hook ในคอมโพเนนต์ SingleComponent
  */
  const { slug } = useParams(); // Get slug from URL params using useParams hook

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/blog/${slug}`)
      .then(response => {
        setBlog(response.data);
      }).catch(err => alert(err))
  }, [slug]); // Add slug to useEffect dependencies
  
  return (
    <div className='container p-5'>
        <Navbar/>
        {blog && 
        <div>
            <h1>{blog.title}</h1>
            <p>{parse(blog.content)}</p>
            <small className='text-muted'>author : {blog.author} , Publish : {new Date(blog.createdAt).toLocaleDateString()} , Update : {new Date(blog.updatedAt).toLocaleDateString()}</small>
        </div>}
    </div>
  )
}

export default SingleComponent;
