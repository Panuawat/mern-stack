import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUser } from "../services/authorize";

function Form() {
  const [state, setState] = useState({
    title: "",
    author: getUser(),
  });

  const { title, author } = state;

  const [content, setContent] = useState("");

  const submitContent = (e) => {
    setContent(e);
  };
  //กำหนดค่าให้กับ state name = ชื่อในตัวแปร state เช่น title
  const inputValue = (name) => (e) => {
    // console.log(name , e.target.value);
    setState({ ...state, [name]: e.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    // console.table({title,content,author});
    console.log(process.env.REACT_APP_API);
    //http://localhost:5500/api/create
    axios
      .post(`${process.env.REACT_APP_API}/create`, { title, content, author })
      .then((res) => {
        Swal.fire({
          title: "Notice",
          text: "Your work has been saved",
          icon: "success",
        });
        setState({ ...state, title: "", author: "" });
        setContent('')
      })
      .catch((err) => {
        Swal.fire({
          title: "Notice",
          text: err.response.data.error,
          icon: "error",
        });
      });
  };

  return (
    <div className="container p-5">
      <Navbar />
      <h1>เขียนบทความ</h1>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>ชื่อบทความ</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={inputValue("title")}
          />
        </div>
        <div className="form-group">
          <label>รายละเอียดบทความ</label>
          <ReactQuill
            value={content}
            onChange={submitContent}
            theme="snow"
            className="pb-5 mb-3"
            style={{border:'1px solid black'}}
          />
        </div>
        <div className="form-group">
          <label>ชื่อผู้แต่ง</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={inputValue("author")}
          />
        </div>
        <br />
        <input type="submit" value="บันทึก" className="btn btn-primary" />
      </form>
    </div>
  );
}

export default Form;
