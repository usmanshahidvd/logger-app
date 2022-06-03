import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import DataTable from './containers/dataTable';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<DataTable />} />
        </Routes>
      </div>
      </Router>
      
  );
}

export default App;
