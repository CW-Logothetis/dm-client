import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
 
export default function Edit() {
 const [form, setForm] = useState({
    tags: [],
    file: null,
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
//  These methods will update the state properties.
//  function updateForm(value) {
//    return setForm((prev) => {
//      return { ...prev, ...value };
//    });
//  }

function handleTagChange (tags) {
  setForm(prevState => {
    return {
          ...prevState,
          tags,
    }
  }
  )}

  // handle adding a file
  function handleFileChange (event) {
    event.preventDefault()
    const {name, files, type} = event.target
    setForm((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : null
    }));
  };
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedDocument = {
     tags: form.tags,
     file: form.file,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedDocument),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
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
   </div>
 );
}