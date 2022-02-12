import React from "react";
import "./App.css";

// import FileUpload from "./components/Form";
import DataTable from "./components/SimpleTable";
// import DocList from "./components/PageTable";

function App() {
  return (
    <div className="container">
      <h2>Document Manager</h2>
      <>
        {/* <FileUpload />, */}
        {/* <DocList />, */}
        <DataTable/>
      </>
    </div>
  );
}

export default App;