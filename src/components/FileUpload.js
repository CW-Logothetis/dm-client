import React, { useState } from 'react';
import { useNavigate } from "react-router";

import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

// import axios from 'axios';

// import LinearProgress from "@mui/material/LinearProgress";

import { useUploadForm } from "./UploadForm";


// const client = axios.create({
//   baseURL: "http://localhost:5000/record" 
// });

function FileUpload() {

  const [form, setForm] = useState(
    {
      tags: [],
      file: null
    }
  )
  const navigate = useNavigate();
  // These methods will update the state properties. MERN tutorial. Think original suffice here
  //  function updateForm(value) {
  //   return setForm((prev) => {
  //     return { ...prev, ...value };
  //   });
  // }

  const { isLoading, isSuccess, uploadForm, progress } = useUploadForm(
    "http://localhost:5000/record/add"
  );

// handle text input change for Assignee - DOESN'T WORK
  function handleTagChange (tags) {
    setForm(prevState => {
      return {
            ...prevState,
            tags,
      }
    }
    )}

  // handle text input change for fileName
  // function handleChange (event) {
  //   event.preventDefault()
  //   const {name, value} = event.target
  //           setForm(prevState => {
  //               return {
  //                   ...prevState,
  //                   [name]: value,
  //               }
  //           })
  //       }

    // handle adding a file
    function handleFileChange (event) {
      event.preventDefault()
      const {name, files, type} = event.target
      setForm((prevState) => ({
        ...prevState,
        [name]: type === 'file' ? files[0] : null
      }));
    };
  
   // send to the DataTable 
  async function transferFileData(event) {
    event.preventDefault();

    // const newPerson = { ...form }; from Mongo tut. use formData instead. no spread

    const formData = new FormData();
    
    let arr = form.tags
    arr.forEach((item) => formData.append("array[]", item))
    // console.log(formData.getAll("array[]"))
    formData.append( "tags", form.tags );
    
    formData.append( "file", form.file );

     
    

    // React.useEffect(() => {
    // await fetch("/add", {
    //  method: "POST",
    //  headers: {
    //    "Content-Type": "undefined",   // multipart needed?
    //  },
    //  body: formData,
    // })  
    // .catch(error => {
    //   window.alert(error);
    //   return;
    // });

    //transfer props to DataTable - from original, closed for MERN
    // props.transfer(form);
    console.log(form)
    console.log(formData)

    clearState()
    navigate("/");
    return await uploadForm(formData);
  }
  
  const clearState = () => {
    setForm({
      tags: [],
      file: ''
    });
    
  };

  // fileData purely to see file name, date, type data is working
  const fileData = () => {
    
    if (form.file) {
       
      return (
        <div>
          <h2>File Details:</h2>
          {/* <p>File Name: {form.file.name}</p> */}
          <p>File Type: {form.file.type}</p>
          {/* <p>
            Last Modified:{" "}
            {form.file.lastModifiedDate.toDateString()}
          </p> */}
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Empty</h4>
        </div>
      );
    }
  };
  
  return (
    <div>
    <h3>Create New Record</h3>
      <form onSubmit={transferFileData}>
        {/* <label>Assignee</label>
        <input type="text" name="assignees" value={form.assignees} onChange={handleChange} /> */}

        <TagsInput name="tags" value={form.tags} onChange={handleTagChange} />
      
        <input name="file" type="file" onChange={handleFileChange} multiple/>

        {/* <label>File Name</label>
        <input type="text" name="fileName" value={form.fileName} onChange={handleChange}/> */}

        {/* <button>Click Me</button> original, input below from MERN*/} 
        <input
           type="submit"
           value="Add file"
          //  className="btn btn-primary"
         />
        
      </form>

      {fileData()}
    </div>
  );
}
  
export default FileUpload;