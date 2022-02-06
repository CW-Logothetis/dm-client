import React, { useState } from 'react';
  
function FileUpload(props) {

  const [form, setForm] = useState(
    {
      assignees: "",
      fileName: ""
    }
  )

  function handleChange (event) {
    event.preventDefault()
    const {name, value} = event.target
            setForm(prevForm => {
                return {
                    ...prevForm,
                    [name]: value,
                }
            })
        }
  
  const transferFileData = (event) => {
    event.preventDefault();
    // const val = form
    props.transfer(form);
    console.log(form)
    clearState()
  }
  
  const clearState = () => {
    setForm({
      assignees: "",
      fileName: ""
    });
  };
  
  return (
    <div>
      <form onSubmit={transferFileData}>
        <label>Assignee</label>
        <input type="text" name="assignees" value={form.assignees} onChange={handleChange} />
        <label>File Name</label>
        <input type="text" name="fileName" value={form.fileName} onChange={handleChange} />
        <button>Click Me</button>
      </form>
    </div>
  );
}
  
export default FileUpload;