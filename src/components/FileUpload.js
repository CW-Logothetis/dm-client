import React, { useState } from 'react';

// import AssigneeTags from './Assignee';

import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

function FileUpload(props) {

  const [form, setForm] = useState(
    {
      tags: [],
      fileName: "",
      file: null
    }
  )

// handle text input change for Assignee - DOESN'T WORK
  function handleTagChange (event) {
    const {name, value} = event.target
    setForm(prevState => {
      return {
            ...prevState,
            [name]: value,
      }
    }
    )}

  // handle text input change for fileName
  function handleChange (event) {
    event.preventDefault()
    const {name, value} = event.target
            setForm(prevState => {
                return {
                    ...prevState,
                    [name]: value,
                }
            })
        }

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

    //transfer props to DataTable
    props.transfer(form);
    console.log(form)
    clearState()
  }
  
  const clearState = () => {
    setForm({
      tags: [],
      fileName: "",
      file: null
    });
  };

  // fileData purely to see file name, date, type data is working
  const fileData = () => {
    
    if (form.file) {
       
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {form.file.name}</p>
          <p>File Type: {form.file.type}</p>
          <p>
            Last Modified:{" "}
            {form.file.lastModifiedDate.toDateString()}
          </p>
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

        <label>File Name</label>
        <input type="text" name="fileName" value={form.fileName} onChange={handleChange}/>

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