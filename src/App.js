import React from "react";
import "./App.css";

import FileUpload from "./components/FileUpload";
import DocList from "./components/PageTable";
// import DataTable from "./components/DataTable";

function App() {
  return (
    <div className="container" style={{ width: "600px" }}>
      <h2>Document Manager</h2>
      <>
        <FileUpload />,
        <DocList />,
        {/* <DataTable /> */}
      </>
    </div>
  );
}

export default App;