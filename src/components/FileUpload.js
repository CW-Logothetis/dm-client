import React, { useState } from 'react';
  
function FileUpload(props) {

  const [form, setForm] = useState(
    {
      assignees: "",
      fileName: "",
      file: null
    }
  )

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

    // Set up the handler
    function handleFileChange (event) {
      event.preventDefault()
      const {name, files, type} = event.target
      setForm((prevState) => ({
        ...prevState,
        [name]: type === 'file' ? files[0] : null
      }));
    };
  
  const transferFileData = (event) => {
    event.preventDefault();
    // const val = form

    const formData = new FormData();
    formData.append( "assignees", form.assignees );
    formData.append( "fileName", form.fileName );
    formData.append( "file", form.file );

    props.transfer(form);
    console.log(form)
    clearState()
  }
  
  const clearState = () => {
    setForm({
      assignees: "",
      fileName: "",
      file: null
    });
  };

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
        <label>Assignee</label>
        <input type="text" name="assignees" value={form.assignees} onChange={handleChange} />

      
        <input name="file" type="file" onChange={handleFileChange} />
         
         

        <label>File Name</label>
        <input type="text" name="fileName" value={form.fileName} onChange={handleChange} />
        <button>Click Me</button>
        
      </form>

      {fileData()}
    </div>
  );
}
  
export default FileUpload;