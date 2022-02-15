import React from 'react';
// import { useHistory } from 'react-router';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {postGame, getGenres} from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import {useState,useEffect} from 'react';

import './styles/GameCreate.css';
import Button from '@material-ui/core/Button';

export default function GameCreate (){ 
    // const history = useHistory();
    const dispatch = useDispatch();    
    const navigate = useNavigate();
    const genres = useSelector(state => state.genres)  // Estado Global de los Generos  

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]) 

    const [input, setInput] = useState({
        name:"",      
        description:"",         
        platform:[],
        image:"",
        released:"",
        rating:"",  
        genre:[],
          
    })

    const [errors, setErrors] = useState({});

    //------------- PARTE DE VALIDACIONES ---------------

    function validate(input){
        let errors ={};
        if (!input.name) {
            errors.name = 'Se requiere una Nombre de JUEGO';
        }else if (!input.description) {
            errors.description = 'se Requiere una Altura'
        }
        return errors;
    };

    //------------- PARTE DE HANDLES ---------------------

    function handleChange(p) { // va a  ir modificando cuando cambien los input
        setInput({
            ...input,
            [p.target.name] : p.target.value
        })
        setErrors(validate({
            ...input,
            [p.target.name] : p.target.value
        }))
        console.log(input)
    }

    function handleCheck(p) {
        if (p.target.checked){
            setInput({
                ...input,
                status: p.target.value
            })
        }
    }
    
    const handleOnChange = (p) => {
        //seteo el input
        setInput({
            ...input,
            [p.target.name]: p.target.value
        })
    }

    //////// GENEROS //////// handleSelect y handleDelete
    const handleSelect = (p) => {
        const select = input.genre.find(p => p === p.target.value)
        if(select) return
        setInput({
            ...input,
            genre: [...input.genre, p.target.value]
        })
    }
    function handleDelete(p){
        setInput({
            ...input,
            // va guardando en el arreglo todo lo que voy eligiendo de generos linea 42
            genre: input.genre.filter (occ => occ !== p)
        })
    }  

    function handleSubmit(p) {
        p.preventDefault();
        console.log(input)
        setErrors(validate({
            ...input,
            [p.target.name]: p.target.value
        }));        
        dispatch(postGame(input)) // input es el payload
        alert ("JUEGO Creado!!!")
        setInput({ // seteo el input a cero
            name:"",      
            description:"",         
            platform:[],
            genre:[],
            image:"",
            released:"",
            rating:"",
        })
        // history.push('/home')
        navigate('/home');
    }  
    
//-------------------------------------------------------------------------------------------


    return(
        <>
        <div>
        <Link to= '/home'><button>Volver</button></Link>             
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
            {/* <Button  variant="contained" color="secondary" onClick={p => {handleClick(p)}}>
                    ACEPTAR Y CREAR
            </Button> */}
            </div>  
            <br/><br/><br/> 
        <form onSubmit={(p) => handleSubmit(p)} >
                <div>
                    <label className="hijo">Nombre Juego:</label>
                    <input
                    type="text"
                    value= {input.name}
                    name="name"
                    onChange={(p)=>handleChange(p)}
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <br/> 
                <div>
                    <label className="hijo">Descripción:</label>
                    <input
                    type="text"
                    value= {input.description}
                    name="description"
                    onChange={(p)=>handleChange(p)}
                    />
                </div>
                <br/> 
                <div>
                    <label className="hijo">plataforma:</label>
                    <input
                    type="text"
                    value= {input.platform}
                    name="platform"
                    onChange={(p)=>handleChange(p)}
                    />
                </div>
                <br/> 
                <div>
                    <label className="hijo">Imagen:</label>
                    <input
                    type="text"
                    value= {input.image}
                    name="image"
                    onChange={handleChange}
                    />
                    <br/> <br/>
                    <select onChange={(p)=>handleSelect(p)}>
                    <br/>
                    <option value="">--Seleccione Genero--</option>
                        {genres?.map((gen) => {
                        return (
                            <option key={gen.id} value={gen.name}>
                                {gen.name}
                            </option>
                        );
                    })}
                    
                    </select >
                    <br/><br/><br/>                  
                    <button type='submit'>Crear Personaje</button>   
                </div>                            
                
            </form>  
             
            {input.genre.map(el => 
                <div className='divOcc'>
                    <p>{el}</p>
                <button className="botonX" onClick={el => {handleDelete(el)}}>x</button>
              </div>
            )}
        </>            
    )}



