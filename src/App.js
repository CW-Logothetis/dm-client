import React from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import FileUpload from "./components/FileUpload";

import DocList from "./components/PageTable";

function App() {
  return (
    <div className="container" style={{ width: "600px" }}>
      <h4>Document Manager</h4>
      <>
        <FileUpload />,
        <DocList />
      </>
      
    </div>
  );
}

export default App;