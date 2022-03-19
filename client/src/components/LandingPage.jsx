import React  from 'react';
import {Link} from 'react-router-dom';

import Button from '@material-ui/core/Button'; //npm i @material-ui/core
import './styles/LandingPage.css'; // importo los styles de mi landinpage.css

export default function LandingPage(){
    return(
        <div>            
            <h1 className="colorLetras">P.I. Henry Games</h1>            
            <div className="padre">
                <h1 className="colorLetrasBienvenido">Bienvenidos a mi PI de Video Juegos</h1>
            </div>            
            <h3 className="hijo">by Marcos Dacunda FT-19a</h3>
            
            <Link to = '/home'>     
            <br /><br /><br /> 
            <img className="logo" src="https://media.istockphoto.com/vectors/round-colorful-neon-lets-play-sign-vector-id1174957431?k=20&m=1174957431&s=612x612&w=0&h=oROOzp5cpHREYJgSJfQRYoPbeb2DYTnUdb5OlkkY4yI=" alt="to home" />
                {/* Boton lindo de lest play cuadrado neon ("https://media.istockphoto.com/vectors/horizontal-colorful-neon-lets-play-sign-vector-id1174957456?k=20&m=1174957456&s=612x612&w=0&h=QdjOYwO_kpNfiUQWkpy46PKTosXvQ-B__ht2ZVuWDfY=") */}
                {/* Boton lindo con forma de joy de neon("https://media.istockphoto.com/vectors/colorful-neon-lets-play-sign-with-game-controller-vector-id1174957382?k=20&m=1174957382&s=612x612&w=0&h=7321JRo08er3YChzPh2HkkrfvpYKgbaEzr8L-ebCTsg=") */}
                {/* <img className="logo" src="https://fondosmil.com/fondo/35731.jpg" alt="to home" /> */}                
                <br /><br />
                <button src='/Home'>INGRESAR</button>
                {/* <Link to='/games'><button>Home</button></Link> */}
                {/* <Button variant="contained" color="primary">INGRESAR</Button> */}
                <br/><br/><br/>
            </Link>

        </div>
    )
}