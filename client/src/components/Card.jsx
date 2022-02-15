//Card solo renderiza lo que yo necesito
import React from "react";
import './styles/Card.css'; // importo los styles de mi Card.css

export default function Card({name, image, genre, genres}){ // platform
    
    // var genre2= []
    // if (genre) { 
    //     Array.isArray(genre) 
    //       ? (genre2 = genre) 
    //       : (genre2 = genre.map(e => e.name))
    //     //   .name)) 
    // } 
    // if (genre){
    return (
        <div>   
            <h2 class="heading">{name}</h2>                        
            <img  className="card" src={image} alt="img not found" width = "400px" height="270px"/>
            <h5 class="headingRojo">GENEROS: {genres
                        ? genres.map((p) => p.name + ", ")
                        : genre.map((p) => p.name + ", ")}</h5>

            {/* <h5 class="heading">Generos:  {genre.join(', ')}</h5> */}
            {/* .join(', ') */}
            {/*<h5 class="heading">Genero:{genre}</h5>            */}
            {/* <h5 class="heading">Platform:{platform.join(' , ')}</h5> */}
        </div>)
        // } else {
        // <div> 
        //     <h2 class="heading">{name}</h2>                        
        //     <img  className="card" src={image} alt="img not found" width = "400px" height="270px"/>
        //     <h5 class="heading">Generos:{genres.name}</h5>
        //     {/* .join(', ') */}
        //     {/*<h5 class="heading">Genero:{genre}</h5>            */}
        //     {/* <h5 class="heading">Platform:{platform.join(' , ')}</h5> */}
        // </div> 
        // }    
}