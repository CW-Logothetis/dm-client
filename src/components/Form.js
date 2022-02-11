import React, { useState } from "react";
import TagsInput from 'react-tagsinput';

import { useTable, usePagination  } from 'react-table'
import './table.css'
import makeData from "../makeData";

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
//   const [fileInfo, setFileInfo] = useState([])

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
    formData.append( "tags", form.tags );
    
    formData.append( "file", form.file );
    formData.append( "fileName", form.fileName );
    formData.append( "type", form.type );

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
    formData.append("uploadDate", dateTime);

    // props.transfer(form);

    // setFileInfo(form)

    clearState()
    console.log(form)
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
        <div className="file-info">
          <h2>File Details:</h2>
          <p>File Name: {form.file.name}</p>
          <p>File Type: {form.file.type}</p>
          <p>Upload Date:{" "}{today}</p>

        </div>
      );
    } else {
      return (
        <div className="file-info">
          <h4>Choose a file to upload</h4>
          <p>File Name: </p>
          <p>File Type: </p>
          <p>Upload Date:</p>
        </div>
      );
    }
  };
  
  return (
    <div className="form-flex">

      <form onSubmit={transferFileData}>
        <label for="tags"> Add assignee(s) and choose files for upload
          <TagsInput name="tags" value={form.tags} onChange={handleTagChange} class="tags-bar"/>
        </label>
        <div className="btn-flex">
          <input id="chooseFile" name="file" type="file" onChange={handleFileChange} multiple className="btn-form btn-form--choose"/>
          <button className="btn-form btn-form--upload">Upload File(s)</button>
        </div>
      
      </form>
         {fileData()}
         <DocList />
    </div>
    
  ); 
}

export default FileUpload;




function Table({ columns, data }) {
    // State and functions returned from useTable build the UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,             // Normally 'rows'. 'Page' only has the rows
                        // for the active page
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(        // useTable() ‘react-table‘ hook to distribute values from 
                        // <Table /> column and data objects to the table's properties
      {
        columns,
        data,
        initialState: { pageIndex: 0 },
      },
      usePagination
    )

    // render the Header and table body cells
    return (
        <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        {/* 
          Pagination
        */}
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </>
    )
}

function DocList(form) {
    const [data, setData] = React.useState(React.useMemo(() => {form}, [])); // dummy data from makeData.json
   
    const columns = React.useMemo(
        () => [
                {
                    Header: 'File Name',
                    accessor: 'fileName',
                },
                {
                    Header: 'Upload Date',
                    accessor: 'uploadDate',
                },
                {
                    Header: 'Type',
                    accessor: 'type',
                },
                {
                    Header: 'Assignees',
                    accessor: 'tags',
                },
            {
            Header: "Delete",
            id: "delete",
            accessor: (str) => "delete",
    
            Cell: (tableProps) => (
                <span
                style={{
                    cursor: "pointer",
                    color: "red"
                }}
                onClick={() => {
                    const dataCopy = [...data];
                    dataCopy.splice(tableProps.row.index, 1);
                    setData(dataCopy);
                }}
                >
                x
                </span>
            )
            }
        ],
        [data]
        );

        return (

              <Table className="doc-list" columns={columns} data={data} />
          )
    }


