import React from "react";

import makeData from '../makeData.json';
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
        {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
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

function DocList(props) {
    
    const [data, setData] = React.useState(React.useMemo(() => makeData, []));
   
    // const addRows = (data) => {
    //     const totalFiles = data.length;
    //     data.id = totalFiles + 1;
    //     const updatedData = [...data];
    //     updatedData.push(data);
    //     setData(updatedData);
    //   };



    const columns = React.useMemo(
        () => [
            // {
            //     Header: 'File name',
            //     columns: [
            //         {
            //             Header: 'File Name',
            //             accessor: 'fileName',
            //         },
            //     ],
            // },
            // {
            //     Header: 'File Info',
                // columns: [
                
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
                  
                   
                // ],
            // },
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