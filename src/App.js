import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


// import of components
import Navbar from './components/navbar';
import Registration from './components/registration';
import Login from './components/login';
import Restuarant from './components/restaurant';
import Home from './components/home';
import AboutUs from './components/aboutus';
import Service from './components/services';



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Switch>
      <Route  exact path={`/`} component={Home} />
      <Route  path={`/aboutus`} component={AboutUs} />
      <Route  path={`/service`} component={Service} />
      <Route  path={`/register`} component={Registration} />

      <Route  path={`/login`} component={Login} />
      {localStorage.getItem('token')!==''?(
      <>
      <Route path={`/Restaurant/find`} component={Restuarant} />
      <Route path={`/Restaurant/find/FoodLists/:id`} component={Restuarant} />
      </>
      ):<div style={{fontSize:"50px",fontWeight:"bold",color:"#dc3545",marginTop:"20%"}}>UNAUTHORISED ACCESS</div>}
      {}
      </Switch>
    </div>
    </Router>
  );
}

export default App;
