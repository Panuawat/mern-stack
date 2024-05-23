import React,{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2'
import parse from 'html-react-parser';
import { getUser } from './services/authorize';

function App() {
  const [blogs,setBlogs] = useState([])

  const fetchData = () => {
    axios.get(`${process.env.REACT_APP_API}/blogs`)
    .then(response => {
      setBlogs(response.data)
    }).catch(err => alert(err))
  }

  useEffect(() => {
    fetchData()
  },[])

  const confilmDelete = (slug) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug)
      }
    });
  }

  const deleteBlog = (slug) => {
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`)
    .then(res => {
       Swal.fire({
          title: "Deleted!",
          text: res.data.message,
          icon: "success"
        });
        fetchData()
    }).catch((err) => {
      console.log(err);
    })
   
  }

  return (
    <div className='container p-5'>
      <Navbar/>
      {blogs.map((blog,i) => {
        return (
        <div className='row' key={i} style={{borderBottom:'1px solid silver'}}>
          <div className='col pt-3 pb-2'>
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
              <div>{parse(blog.content.substring(0,250))}</div>
              <small className='text-muted'>author : {blog.author} , Publish : {new Date(blog.createdAt).toLocaleDateString()} , Update : {new Date(blog.updatedAt).toLocaleDateString()}</small>
              <br/>
              <div className='my-2'>
                {
                  getUser() &&(
                    <>
                        <Link to={`/blog/edit/${blog.slug}`} className='btn btn-outline-warning'>Update</Link>  &nbsp;
                        <button className='btn btn-outline-danger' onClick={() => confilmDelete(blog.slug)}>Delete</button>
                    </>
                  )
                }
              </div>
          </div>
        </div>)
      })}
    </div>
  );
}

export default App;
