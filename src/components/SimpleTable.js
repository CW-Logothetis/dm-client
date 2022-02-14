import React, { useState } from 'react';
import FileUpload from './Form';
// import makeData from '../makeData.json';

function DataTable() {
  const [fileData, setFileData] = useState([]);
  
  const tableRows = fileData.map((file) => {
    return (
      <tr key={file.id}>
        <td >{file.id}</td>
        <td >{file.file.name}</td>
        <td >{file.file.type.slice(-4)}</td>
        <td >{file.dateTime}</td>
        <td >{file.tags}</td>
      </tr>
    );
  });
  
  const addRows = (data) => {
    const totalFiles = fileData.length;
    data.id = totalFiles + 1;
    const updatedFileData = [...fileData];
    updatedFileData.push(data);
    setFileData(updatedFileData);
  };
  
  return (
    <div>
      
      <FileUpload transfer={addRows} />
      <h3>Document List</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>File Name</th>
            <th>File Type</th>
            <th>Upload Date</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      
    </div>
  );
}

export default DataTable
