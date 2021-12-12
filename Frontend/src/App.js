import logo from './logo.svg';
import './App.css';
import Giro from './Vistas/Jefe PPEPS/GiroAhorro';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";



function App() {
  return (
   <Router>
     <Routes>
        <Route exact path='/' element={<Giro/>}/>
      </Routes>
   </Router>
  );
}

export default App;
