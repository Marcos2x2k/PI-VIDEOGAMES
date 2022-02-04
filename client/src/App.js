import './App.css';
//IMPORTO ROUTES Y ROUTER, SWITCH EN ESTA VERSION YA NO ANDA /
//SOLO ANDA Routes/BrowserRouter
import {Routes, Route} from 'react-router-dom'; //, BrowserRouter

// IMPORTO LOS COMPONENTES
import LandingPage from './components/LandingPage.jsx'
import Home from './components/Home.jsx';
import GameCreate from './components/GameCreate.jsx';


//function App() { // me gusta mas trabajar con constantes
const App = () => {
   // ACA RENDEDIZAMOS LAS RUTAS
  return (
    // <BrowserRouter>
    <div className="App">    
      {/* <h1>P.I. Henry Games</h1>
      <h3>by Marcos Dacunda FT-19a</h3> */}
        <Routes>         
          <Route exact path='/' element={<LandingPage/>}/>   
          <Route exact path='/Home' element={<Home/>}/> 
          {/* <Route exact path='/home/:id' element={<Detail/>}/> */}
          <Route path='/games' element={<GameCreate/>}/>        
        </Routes>   
    </div>
  //  </BrowserRouter>
  );
}

export default App;
//  *** este es la pagina inicial sin tocar
  // return (
  //   <div className="App">
  //     <h1>Henry Videogames</h1>
  //   </div>
  // );
// }

          




