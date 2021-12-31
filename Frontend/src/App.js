import logo from './logo.svg';
import './App.css';
import Giro from './Vistas/Jefe PPEPS/GiroAhorro';
import CreacionGiro from './Vistas/Ejecutiva de Pago/CreacionGiro';
import AlmacenamientoGiro from './Vistas/Secretaria/AlmacenamientoGiros';

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
        <Route exact path='/jefePPEPS' element={<Giro/>}/>
        <Route exact path='/ejecutivaPago' element={<CreacionGiro/>}/>
        <Route exact path='/secretaria' element={<AlmacenamientoGiro/>}/>
      </Routes>
   </Router>
  );
}

export default App;
