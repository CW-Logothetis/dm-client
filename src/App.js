import React, { Component } from 'react';
import DataTable from './components/DataTable';
import DocList from './components/NewTable';
  
class App extends Component {
  render() {
      return(
          <div>
            <DocList />,
            <DataTable />
          </div>
      )
    }

  }
  
export default App