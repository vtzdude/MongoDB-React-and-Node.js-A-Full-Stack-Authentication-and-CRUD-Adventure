import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route, Routes } from "react-router-dom";
import Navigation from './Components/Navigation/Navigation';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Dashboard from './Components/Dashboard/Dashboard';
import Profile from './Components/Pages/EditUser';
import Allusers from './Components/Pages/Allusers';
import EditUser from './Components/Pages/EditUser';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
        
        <Route path='navigation' element={<Navigation/>}/>
        <Route path='dashboard' >
          <Route index element={<Dashboard />} />
          <Route path='Allusers' >
            <Route index element={<Allusers />}/>
            <Route path='edit/:id' element={<EditUser/>}/>
            </Route>
          
        </Route>
          
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
