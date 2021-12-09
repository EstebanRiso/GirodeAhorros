import logo from './logo.svg';
import './App.css';
import Giro from './Vistas/Jefe PPEPS/GiroAhorro';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {
  return (
   <Router>
      <Switch>
        <Route path="/giro">
              <Giro />
        </Route>
        <Route path="/creargiro">
              
        </Route>
      </Switch>
   </Router>
  );
}

export default App;
