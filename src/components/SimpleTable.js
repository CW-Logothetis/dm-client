import React, { useState } from 'react';
import FileUpload from './Form';
// import makeData from '../makeData.json';

function DataTable() {
  const [fileData, setFileData] = useState([]);
  
  const tableRows = fileData.map((file) => {
    return (
      <tr>
        <td key={file.id}>{file.id}</td>
        <td key={file.file.name}>{file.file.name}</td>
        <td key={file.file.type}>{file.file.type}</td>
        <td key={file.dateTime}>{file.dateTime}</td>
        <td key={file.tags}>{file.tags}</td>
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
