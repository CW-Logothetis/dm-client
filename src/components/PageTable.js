import React from "react";

import { useTable, usePagination  } from 'react-table'
import './table.css'
import makeData from "../makeData";

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

function DocList() {
    const [data, setData] = React.useState(React.useMemo(() => makeData, [])); // dummy data from makeData.json
   
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

export default DocList;

