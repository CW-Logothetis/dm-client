import React from "react";

import Table from "./NewTable"; 
// import makeData from '../makeData.json';
import UploadFiles from "./FileUpload";

function DocList() {
    
    const [data, setData] = React.useState( [] );

            setData(filesInfo);
   

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
              <Table columns={columns} data={data}/>,
              <UploadFiles transfer={DocList}/>
          )
    }

export default DocList;