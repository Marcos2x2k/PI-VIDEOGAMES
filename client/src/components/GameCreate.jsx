import React from 'react';


import './styles/GameCreate.css';
import Button from '@material-ui/core/Button';

export default function GameCreate (){ 
    return(
        <>
        <div>             
            <div className="padre">
                <h1 className="colorLetrasBienvenido">** Crear Nuevo Juego **</h1>
            </div>
        </div>   
        <div>            
            <Button  variant="contained" color="secondary" href="/">
                    Ir a Pagina de Lanzamiento
            </Button> 
            <Button  variant="contained" color="primary" href="/Home">
                    Ir a Pagina Home
            </Button> 
            <Button  variant="contained" color="secondary"> {/* // onClick={p => {handleClick(p)}} */}
                    ACEPTAR Y CREAR
            </Button>             
        </div>
        </>
            
    )}



