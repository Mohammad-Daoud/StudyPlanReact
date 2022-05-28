
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
import Navbar from './components/Test/Navbar';
import Daoud from './components/Test/D3Test';




function App() {

  return (
    <div className="App">
       <Navbar/>
      <Router>
       <Routes>
       <Route path='/daoud' element={
         <Daoud />
         }/>
         <Route path='/' element={
         <Test />
         }/>

       </Routes>
      </Router>
    </div>
  );
}

export default App;
