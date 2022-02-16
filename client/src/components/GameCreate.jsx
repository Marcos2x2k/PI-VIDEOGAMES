import React from 'react';
// import { useHistory } from 'react-router';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {postGame, getGenres } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import {useState,useEffect} from 'react';

import './styles/GameCreate.css';
//import Button from '@material-ui/core/Button';

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
        platform:"",        
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
            [p.target.description] : p.target.value
        }))
        console.log(input)
    }
    // function handleCheck(p) {
    //     if (p.target.checked){  //checket es un booleano q indica true o false
    //         setInput({
    //             ...input,
    //             status: p.target.value
    //         })
    //     }
    // }
    // const handleOnChange = (p) => {
    //     //seteo el input
    //     setInput({
    //         ...input,
    //         [p.target.name]: p.target.value //p.target.name SETEA A target.value
    //     })
    // }   

    //////// GENEROS //////// handleSelect y handleDelete
    // const handleSelect = (p) => {
    //     const select = input.genre.find(p => p === p.target.value)
    //     if(select) return
    //     setInput({
    //         ...input,
    //         genre: [...input.genre, p.target.value]
    //     })
    // }
    function handleSelect(p){
        setInput({
        ...input,
        genre:[...input.genre, p.target.value] //para el array de Generos q concatene las selecciones
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
        //console.log(p)
        setErrors(validate({
            ...input,
            [p.target.name]:p.target.value
        }));        
        dispatch(postGame(input)); // input es el payload
        alert ("JUEGO Creado!!!")
        setInput({ // seteo el input a cero
            name:"",      
            description:"",         
            platform:"",            
            image:"",
            released:"",
            rating:"",
            genre:[],
        })
        // history.push('/home')
        navigate('/home');
    } 
    
//-------------------------------------------------------------------------------------------


    return(
        <div>
        <div>                        
            <div className="padre">
                <h1 className="colorLetrasBienvenido">** Crear Nuevo Juego **</h1>
            </div>
        </div>   
            <div>            
            {/* <Button  variant="contained" color="secondary" href="/">
                    Ir a Pagina de Lanzamiento
            </Button> 
            <Button  variant="contained" color="primary" href="/Home">
                    Ir a Pagina Home
            </Button>  */}
            <br/>
            <Link to= '/'><button>Ir a Pagina de Lanzamiento</button></Link> 
            <Link to= '/home'><button>Ir a Pagina Home</button></Link> 
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
                    name="name"
                    value= {input.name}
                    onChange={(p)=>handleChange(p)}
                    autoComplete="off"
                    />
                    {errors.name && (
                        <h2 className='error'>{errors.name}</h2>
                    )}                
                <br/><br/>                 
                    <label className="hijo">Descripción:</label>
                    <input
                    type="text"
                    value= {input.description}
                    name="description"
                    onChange={(p)=>handleChange(p)}
                    />
                    {errors.name && (
                        <h2 className='error'>{errors.description}</h2>
                    )}                
                <br/><br/>          
                    <label className="hijo">Plataforma:</label>
                    <input
                    type="text"
                    value= {input.platform}
                    name="platform"
                    onChange={(p)=>handleChange(p)}
                    />
                <br/><br/>                 
                    <label className="hijo">Rating:</label>
                    <input
                    type="text"
                    value= {input.rating}
                    name="rating"
                    onChange={(p)=>handleChange(p)}
                    />   
                <br/><br/>              
                    <label className="hijo">Fecha Lanzamiento:</label>
                    <input
                    type="text"
                    value= {input.released}
                    name="released"
                    onChange={(p)=>handleChange(p)}
                    />                
                <br/><br/>                
                    <label className="hijo">Imagen:</label>
                    <input
                    type="text"
                    value= {input.image}
                    name="image"
                    onChange={handleChange}
                    />                 
                    <br/> <br/>
                    <div>
                    <label className="hijo">Genero:</label>
                    <select onChange={(p)=>handleSelect(p)}>                    
                    <option value="">--Seleccione Genero--</option>
                        {genres?.map((gen) => {
                        return (
                            <option key={gen.id} value={gen.name}>
                                {gen.name}
                            </option>
                        );
                    })}                    
                    </select>
                    <div>                    
                    {input.genre.map(el => 
                    <div> 
                        <h3 className="hijoRojo">{el}</h3>
                    <button onClick={() => {handleDelete(el)}}>-X-</button>
                    </div>
                    )}
                    </div>
                    </div>                       
                </div>
                <br/><br/><br/>                
                <button type='submit'>Crear Juego</button> 
            </form> 
        </div>            
    )}