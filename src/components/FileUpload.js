import React, { useState } from "react";
import TagsInput from 'react-tagsinput';

// set initial state for all form items
const FileUpload = (props) => {
 const [form, setForm] = useState(
    {
      fileName: "",
      type: "",
      uploadDate: "",
      tags: [],
      file: null
    }
  )

  // handle tag component for Assignee
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
            // not really needed here, but there in case any text fields or checkboxes are added later
            [name]: type === 'file' ? files[0] : null
      }));
    };

  
  // send to the DataTable 
  const transferFileData = (event) => {
    event.preventDefault();

    // different types of input, so FormData used
    const formData = new FormData();

    let arr = form.tags
    arr.forEach((item) => formData.append("array[]", item))
    formData.append( "tags", form.tags );
    
    formData.append( "file", form.file );
    formData.append( "fileName", form.fileName );
    formData.append( "type", form.type );

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
    formData.append("uploadDate", dateTime);

    // props.transfer(form);

    clearState()
    console.log(form)
  }
 
  
  const clearState = () => {
    setForm({
      tags: [],
      fileName: "",
      type: "",
      uploadDate: "",
      file: null
    });
  };

  // fileData purely to see file name, date, type data is working
  const fileData = () => {
    let today = new Date().toLocaleDateString()
    if (form.file) {
       
      return (
        <div className="file-info">
          <h2>File Details:</h2>
          <p>File Name: {form.file.name}</p>
          <p>File Type: {form.file.type}</p>
          <p>Upload Date:{" "}{today}</p>

        </div>
      );
    } else {
      return (
        <div className="file-info">
          <h4>No file uploaded</h4>
          <p>File Name: </p>
          <p>File Type: </p>
          <p>Upload Date:</p>
        </div>
      );
    }
  };
  
  return (
    <div className="form-flex">

      <form onSubmit={transferFileData}>
        <TagsInput name="tags" value={form.tags} onChange={handleTagChange} class="tags-bar"/>
        <div className="btn-flex">
          <input id="chooseFile" name="file" type="file" onChange={handleFileChange} multiple className="btn-form btn-form--choose"/>
          <button className="btn-form btn-form--upload">Upload File(s)</button>
        </div>
      
      </form>
         {fileData()}
    </div>
  ); 
}

export default FileUpload;