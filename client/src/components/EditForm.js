import React, { useState,useEffect } from 'react'
import Navbar from './Navbar';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditForm() {
  const [state,setState] = useState({
    title:"",
    author:"",
    slug:""
  })
  
  const {title,author} = state;

  const [content, setContent] = useState("");

  const submitContent = (e) => {
    setContent(e);
  }
  //กำหนดค่าให้กับ state name = ชื่อในตัวแปร state เช่น title
  const inputValue = name => e => {
    // console.log(name , e.target.value);
    setState({...state,[name]:e.target.value})
  }
  const { slug } = useParams(); // Get slug from URL params using useParams hook

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/blog/${slug}`)
      .then(response => {
        const { title,content,author } = response.data
        setState({...state,title,author,slug})
        setContent(content)
      }).catch(err => alert(err))
  }, [slug]); // Add slug to useEffect dependencies

  const showUpdateForm = () => (
    <>
      <h1>เขียนบทความ</h1>
      <form onSubmit={submitForm}>
        <div className='form-group'>
          <label>ชื่อบทความ</label>
          <input type='text' className='form-control' value={title} onChange={inputValue('title')} />
        </div>
        <div className='form-group'>
          <label>รายละเอียดบทความ</label>
          <ReactQuill
            value={content}
            onChange={submitContent}
            theme="snow"
            className="pb-5 mb-3"
            style={{border:'1px solid black'}}
          />
        </div>
        <div className='form-group'>
          <label>ชื่อผู้แต่ง</label>
          <input type='text' className='form-control' value={author} onChange={inputValue('author')} />
        </div>
        <br />
        <input type='submit' value='อัพเดต' className='btn btn-warning' />
      </form>
    </>
  );
  

  const submitForm = (e) => {
    e.preventDefault();
    // console.table({title,content,author});
    console.log(process.env.REACT_APP_API);
    //http://localhost:5500/api/create
    axios.put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,author})
    .then(res => {
      Swal.fire({
        title: "Notice",
        text: "Your work has been Updated",
        icon: "success"
    })
    const { title,content,author,slug } = res.data
    setState({...state,title,content,author,slug})
    }).catch(err => {
      Swal.fire({
        title: "Notice",
        text: err.response.data.error,
        icon: "error"
      })
    }) 
  }

  return (
    <div className='container p-5'>
        <Navbar/>
        {showUpdateForm()}
    </div>
  )
}

export default EditForm