import React, { useState } from 'react';
import FileUpload from './FileUpload';
import makeData from '../makeData.json';



function DataTable() {
  const [fileData, setFileData] = useState(makeData);
  
  const tableRows = fileData.map((file) => {
    return (
      <tr>
        <td key={file.id}>{file.id}</td>
        <td key={file.fileName}>{file.fileName}</td>
        <td key={file.type}>{file.type}</td>
        {/* <td key={file.uploadDate}>{file.uploadDate}</td> */}
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
      <table>
        <thead>
          <tr>
            <th>id</th>
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
