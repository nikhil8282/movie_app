
import './App.css';
import Navbar from './compopnents/Navbar';
import Banner from './compopnents/Banner';
import Movies from './compopnents/Movies';
import Favourite from './compopnents/Favourite';
import {BrowserRouter, Route,Routes} from 'react-router-dom';



function App() {
  return (

 <BrowserRouter>
 
    <Navbar/>
  <Routes>
   
    <Route  path = "/"  element={
      <>
      <Banner/>
       <Movies/>
      </>
    
      }/>
    {/* <Route  path = "/"  element={<Movies/>}/> */}
  
   
    <Route path = "/Favourites" element = {<Favourite/>}/>
  

  </Routes>
 </BrowserRouter>



  );
}

export default App;
