import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from 'axios';

const client = axios.create({
  baseURL: "http://localhost:5000/record" 
});

const Record = (props) => (
  <tr>
    <td>{props.record.tags}</td>
    <td>{props.record.file}</td>
    {/* <td>{props.record.file.type}</td>
    <td>{props.record.file.size}</td> */}
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
 );

 export default function RecordTable() {
  const [records, setRecords] = useState([]);

// This method fetches the records from the database.

  useEffect(() => {
    async function getRecords() {
      const response = await client.get("/");
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const records = await response.json();
      setRecords(records);
    }
  
    getRecords();
  
    return;
  }, [records.length]);
  
  // This method will delete a record
  async function deleteRecord(id) {
    await client.delete(`/${id}`);
    alert("Post deleted!");
    
  
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }
  
  // This method will map out the records on the table
  function RecordTable() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }
  
  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Tags</th>
            <th>File Name</th>
            <th>Type</th>
            <th>Size</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{RecordTable()}</tbody>
      </table>
    </div>
  );
 }

/*
// import makeData from '../makeData.json';
import { useTable, usePagination  } from 'react-table'
// import 'bootstrap/dist/css/bootstrap.min.css';

function Table({ columns, data}) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page, // Instead of using 'rows', we'll use page,
      // which has only the rows for the active page
  
      // The rest of these things are super handy, too ;)
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(  // useTable() from ‘react-table‘ distribute values from column and data objects to the table's properties
      {
        columns,
        data,
        initialState: { pageIndex: 0 },
      },
      usePagination
    )

    // render the Header and table body cells using map() on destructured properties
    return (
        <>
        <pre>
          <code>
            {JSON.stringify(
              {
                pageIndex,
                pageSize,
                pageCount,
                canNextPage,
                canPreviousPage,
              },
              null,
              2
            )}
          </code>
        </pre>
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

function DocList(props) {
    
    const [data, setData] = React.useState(React.useMemo(() => makeData, []));
   
    const columns = React.useMemo(
        () => [
                   
                    {
                        Header: 'ID',
                        accessor: 'id',
                    },
                    {
                        Header: 'File Name',
                        accessor: 'fileName',
                    },
                    {
                        Header: 'File Type',
                        accessor: 'type',
                    },
                    {
                        Header: 'Upload Date',
                        accessor: 'uploadDate',
                    },
                    {
                        Header: 'Assignee',
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
              <Table columns={columns} data={data} />
          )
    }

export default DocList;
*/