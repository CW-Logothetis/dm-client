import React, { useState } from 'react';
import FileUpload from './FileUpload';
import makeData from '../makeData.json';

function DataTable() {
  const [fileData, setFileData] = useState(makeData);
  
  const tableRows = fileData.map((file) => {
    return (
      <tr>
        <td key={file.id}>{file.id}</td>
        <td key={file.assignees}>{file.assignees}</td>
        <td key={file.fileName}>{file.fileName}</td>
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
            <th key="id">id</th>
            <th key="assignee">Assignee</th>
            <th key="filename">File Name</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <FileUpload transfer={addRows} />
    </div>
  );
}

export default DataTable

