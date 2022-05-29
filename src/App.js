
import './App.css';
import { useState } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Switch,
} from "react-router-dom";
import Plan from './components/Test/PlanMain';





function App() {

  return (
    <div className="App">
       
      <Router>
       <Routes>
         <Route path='/' element={
         <Plan />
         }/>
       </Routes>
      </Router>
    </div>
  );
}

export default App;
