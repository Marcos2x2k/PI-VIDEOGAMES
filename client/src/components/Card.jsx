//Card solo renderiza lo que yo necesito
import React from "react";
import './styles/Card.css'; // importo los styles de mi Card.css

export default function Card({name, image, genre}){ // platform
    // console.log (img)
    return (
        <div>   
            <h2 class="heading">{name}</h2>                        
            <img  className="card" src={image} alt="img not found" width = "400px" height="270px"/>
            <h5 class="heading">Generos:  {genre.join(' , ')}</h5>
            {/*<h5 class="heading">Genero:{genre}</h5>            */}
            {/* <h5 class="heading">Platform:{platform.join(' , ')}</h5> */}
        </div>
    );
}