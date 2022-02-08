import React, { useState } from 'react';

import axios from 'axios';

import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

function FileUpload(props) {

  const [form, setForm] = useState(
    {
      tags: [],
      fileName: "",
      type: "",
      uploadDate: "",
      file: null
    }
  )

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
  const transferFileData = (event) => {
    event.preventDefault();

    const formData = new FormData();

    let arr = form.tags
    arr.forEach((item) => formData.append("array[]", item))
    console.log(formData.getAll("array[]"))

    formData.append( "tags", form.tags );
    formData.append( "fileName", form.fileName );
    formData.append( "file", form.file );
    formData.append( "type", form.type );

    let datestr = Date().toString();
    formData.append("uploadDate", datestr);

    //transfer props to DataTable
    props.transfer(form);
    console.log(form)
    clearState()

    try {
      // make axios post request
      axios({
        method: "post",
        url: "https://httpbin.org/post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch(error) {
      console.log(error)
    }
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
        <div>
          <h2>File Details:</h2>
          <p>File Name: {form.file.name}</p>
          <p>File Type: {form.file.type}</p>
          <p>Upload Date:{" "}{today}</p>

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

      <form onSubmit={transferFileData}>
        {/* <label>Assignee</label>
        <input type="text" name="assignees" value={form.assignees} onChange={handleChange} /> */}

        <TagsInput name="tags" value={form.tags} onChange={handleTagChange} />
      
        <input name="file" type="file" onChange={handleFileChange} multiple/>

        <button>Click Me</button>
        
      </form>

      {fileData()}
      
    </div>
  );
}
  
export default FileUpload;

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = { tags: [] };
//   }

//   handleChange = tags => {
//     console.log(tags);
//     this.setState({ tags });
//   };

//   render() {
//     console.log(this.state);
//     return (
//             <TagsInput
//               name="tags"
//               value={values.tags}
//               onChange={tags => {
//                 console.log(tags);
              
//               }}
//             />
//     )}
// }