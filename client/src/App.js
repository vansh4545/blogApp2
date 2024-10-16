import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Home from './home/home';
import {BrowserRouter,Routes,Route, Outlet,Navigate} from  'react-router-dom';
import Update from "./components/create/Update.jsx";
//components
import Login from './components/account/login'
import DataProvider from './context/DataProvider';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Header from './components/header/header';
import CreatePost from './components/create/CreatePost';
import DetailsView from './components/details/DetailsView.jsx';
const PrivateRoute =({isAuthenticated,...props})=>{
  return isAuthenticated ?
  <>
   <Header isAuthenticated={isAuthenticated}/>
  <Outlet/>
  </>
   : <Navigate replace to ='/login'/>
  
}
// const PrivateRoute2 =({isAuthenticated,...props})=>{
//   return isAuthenticated ?
//   <>
//    <Header/>
//   <Outlet/>
//   </>
//    : <Navigate replace to ='/'/>
  
// }
function App() {

   const [isAuthenticated,isUserAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
       
        <div style={{ marginTop:64 }}>
         
        <Routes>
        <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>}/>

        <Route path='/' >
               <Route path='/' element={<Home isAuthenticated={isAuthenticated}/>}/>
        </Route>

        <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
               <Route path='/create' element={<CreatePost/>}/>
        </Route>
        <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
                <Route path='/details/:id' element={<DetailsView/>}/>
        </Route>

        <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
               <Route path='/update/:id' element={<Update/>}/>
        </Route>

        <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/about' element={<About />} />
        </Route>

        <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
               <Route path='/contact' element={<Contact />} />
        </Route>
        </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App;
