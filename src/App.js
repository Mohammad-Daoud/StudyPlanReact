
import './App.css';
import { useState } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Switch,
} from "react-router-dom";
import Test from './components/Test/Test';




function App() {

  return (
    <div className="App">
      <Router>
       <Routes>
  
         <Route path='/' element={<Test />}/>

       </Routes>
      </Router>
    </div>
  );
}

export default App;
