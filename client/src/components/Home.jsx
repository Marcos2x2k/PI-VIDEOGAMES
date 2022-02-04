import React from 'react';
import Button from '@material-ui/core/Button'; // importo estilo de boton
import './styles/Home.css'; // importo los styles de mi Home.css
// import SearchBar from './SearchBar';

//IMPORTO PORQUE USAMOS HOOKS
import {useState, useEffect, Fragment} from 'react'; //  HOOK USAMOS useState es un hook (//)Fragment es como un div para envolver hijos div en app)
import {useDispatch, useSelector} from 'react-redux'; 
import {getGames, filterGamesByStatus, filterCreated, orderByName, setPage} from '../actions';// Siempre importo las acciones nuevas

//LINK nos sirve para poder movernos por nuestra aplicación
//más fácilmente en lugar de tener que cambiar la URL manualmente en el navegador.
import {Link} from 'react-router-dom';

//ME IMPORTO EL COMPONENTE Card y renderizo en linea 
import Card from './Card';

//IMPORTAMOS EL PAGINADO
import Paginado from './Paginado';

export default function Home (){ 
    const { games, name, page, order} = useSelector(state => state);    
    const dispatch = useDispatch(); // PARA USAR HOOKS
    const allGames = useSelector((state) => state.games) //HOOKS es lo mismo q maps.state.props
    const [orden, setOrden] = useState(''); // es un estado local q arranca vacio para el Asc y Desc Order

    //CREO VARIOS ESTADOS LOCALES y lo seteo en 1- ACA CALCULO LAS CARD POR PAGINAS
    const [currentPage, setCurrentPage] = useState(1); //defino 2 stados 1 con pagina actual y otro q resetea pagina actual
    const [gamesPerPage, setGamesPerPage] = useState(15); // seteo los perros por pagina, depues usar variable para mostrar por cantidad elegida    
    const indexOfLastGame = currentPage * gamesPerPage // aca vale 0 a 14 = 15
    const indexOfFirstGame = indexOfLastGame - gamesPerPage // 0

    // currentGames devuelve un arreglo q entra del 1 al 15
    // creo una constante de los Games en la pagina actual y me traigo el array del estado de los Games 
    const currentGames =  allGames.slice(indexOfFirstGame, indexOfLastGame)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    // ** TRAIGO DEL ESTADO LAS RECETAS CUANDO EL COMPONENTE SE MONTA
    useEffect (()=>{
        dispatch(getGames());
    },[dispatch])

    // ** PARA RESETEAR AL TOCAR EL BOTON volver a cargar los Juegos
    function handleClick(p){
        p.preventDefault(); //PREVENTIVO PARA Q NO RECARGUE TODA LA PAGINA
        dispatch(getGames())}

    // ** ORDENAMIENTO DE PAGINA ASCENDENTE O DESCENDENTE
    function handleSort(p){
        p.preventDefault();
        dispatch(orderByName(p.target.value)) //despacho la accion
        setCurrentPage(1); //ordenamiento seteado en pagina 1
        setOrden(`Ordenado ${p.target.value}`)  //es un estado local vacio, lo uso para modif estado local y renderize
    };
    

    //Aca aplico lógica, esta funcion le paso en el select de Types En HOME -> ALL Generos/Plataformas ETC
    function handleFilterStatus(p){
        dispatch(filterGamesByStatus(p.target.value))
    };

    //filtramos los creados en la Bdatos
    function handleFilterCreated(p){
        dispatch(filterCreated(p.target.value))
    };

    // paginado orden Asc y Desc
    function handleSort(p){
        p.preventDefault();
        dispatch(orderByName(p.target.value)) //despacho la accion
        setCurrentPage(1); //ordenamiento seteado en pagina 1
        setOrden(`Ordenado ${p.target.value}`)  //es un estado local vacio, lo uso para modif estado local y renderize
    };

    const handleClickPage = (page) => {
        dispatch(getGames({ page, name, order }));
        dispatch(setPage(page));
    }

    const totalPages = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

// RENDERIZADOS
// Aca renderizamos un Div
    return(
        
        <div>        
        <div>             
            <div className="padre">
                <h1 className="colorLetrasBienvenido">** Bienvenidos a mi App de Juegos **</h1>
            </div>
        <div>
            <Button  variant="contained" color="primary" onClick={p => {handleClick(p)}}>
                Volver a Cargar todos los Juegos
            </Button>  
            <Button  variant="contained" color="secondary" href="/games/">
                    CREAR JUEGO NUEVO
            </Button> 
            <Button  variant="contained" color="primary" href="/">
            Ir a Pagina de Lanzamiento
            </Button>            
        </div>
            
            <br />
        
        <div>
            <select className="selectfont" onChange={p => handleSort(p)}>
                <option value="" selected disabled hidden>Orden alfabético</option>                
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>
            {/* estatus */}
            <select className="selectfont" onChange={p => handleFilterStatus(p)}>
                <option value="" selected disabled hidden>Filtrados</option>
                <option value='genre'>Por Genero</option>
                {/* <option value='games'>Por Plataforma</option> */}
            </select>
            <select className="selectfont"onChange={p => handleFilterCreated(p)}>
                <option value="" selected disabled hidden>Mostrar Juegos</option> 
                <option value='All'>Todos los Juegos</option>
                <option value='created'>Creados</option>
                <option value='api'>Existentes</option>
            </select>   
            <br /><br /><br />
        </div>
            {/* aca defino las props que necesita el paginado */}
            <Paginado
                    gamesPerPage = {gamesPerPage}
                    allGames={allGames.length}
                    paginado = {paginado}                    
            />
            {/* <SearchBar
            /> */}
                {/* ACA NE TRAIGO LA CARD PARA RENDERIZAR con los datos que quiero */}
                {currentGames?.map ((p) =>{  // CON ? PREGUNTA SI EXISTE Y DESPUES MAPEA
                    return(
                    <Fragment>
                    <div className="carddirection">    
                            <Link to={"/home/" + p.id}>
                                {/* //pase por props .name .image .genre  */}  
                                <Card name={p.name} image={p.image} genres={p.genres}/>
                            </Link>
                    </div>
                    /</Fragment> 
                    );
                })}
            </div> 
        </div>
        
    )}