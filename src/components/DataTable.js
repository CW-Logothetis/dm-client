import React, { useState } from 'react';
import FileUpload from './FileUpload';
import makeData from '../makeData.json';

function DataTable() {
  const [fileData, setFileData] = useState(makeData);
  
  const tableRows = fileData.map((file) => {
    return (
      <tr>
        <td key={file.id}>{file.id}</td>
        <td key={file.tags}>{file.tags}</td>
        <td key={file.fileName}>{file.fileName}</td>
        <td key={file.file.size}>{file.file.size}</td>
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
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Assignee</th>
            <th>File Name</th>
            <th>File Size</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <FileUpload transfer={addRows} />
    </div>
  );
}

export default DataTable

