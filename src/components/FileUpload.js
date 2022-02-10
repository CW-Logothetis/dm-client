import React, { useState } from "react";
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

// set initial state for all form items
const FileUpload = () => {
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
    console.log(formData.getAll("array[]"))
    formData.append( "tags", form.tags );
    
    formData.append( "file", form.file );
    formData.append( "fileName", form.fileName );
    formData.append( "type", form.type );

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
    formData.append("uploadDate", dateTime);

    const submit = document.getElementById("submit");

    //validation if click without uploading a document. Guess they might want to upload without assingee.
    submit.addEventListener("click", validate);

    function validate(e) {
      e.preventDefault();

      const fileUploadField = document.getElementById("firstname");
      let valid = true;

      if (!firstNameField.value) {
        const nameError = document.getElementById("nameError");
        nameError.classList.add("visible");
        firstNameField.classList.add("invalid");
        nameError.setAttribute("aria-hidden", false);
        nameError.setAttribute("aria-invalid", true);
      }
      return valid;
    }

    console.log(form)
    clearState()
  }
  //   try {
  //     // make axios post request
  //     axios({
  //       method: "post",
  //       url: "",
  //       data: formData,
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //   } catch(error) {
  //     console.log(error)
  //   }
  
  
  const clearState = () => {
    setForm({
      tags: [],
      fileName: "",
      type: "",
      uploadDate: "",
      file: null
    });
  };

// fileData lets user double-check they selected the correct file before upload.
  const fileData = () => {
    if (form.file) {
       return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {form.file.name}</p>
          <p>File Type: {form.file.type}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Current File Selection</h4>
        </div>
      );
    }
  };
  
  return (
    <div>

      <form onSubmit={transferFileData}>
        <TagsInput name="tags" value={form.tags} onChange={handleTagChange} />
        <input name="file" type="file" onChange={handleFileChange} multiple/>
        <button>Click Me</button>
      </form>

    {fileData()}
      
    </div>
  ); 
}

export default FileUpload;