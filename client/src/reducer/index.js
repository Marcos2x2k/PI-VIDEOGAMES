// ** ACÁ EN REDUCER CREO MI ESTADO INICIAL - 
// ** Y HAGO LA LOGICA DE MIS FILTRADOS
const initialState = {
    games : []
}

function rootReducer(state =  initialState, action){
    switch(action.type){
        case 'GET_GAMES':
            return{
                ...state, // guardamos el estado anterior como buena practica
                games: action.payload,  
                //Asi creamos en JSON - var json = await axios.get("http://localhost:3001/dogs",{});
                // el payload lo creamos en actions como payload: json.data
                allGames: action.payload
            }  
        case 'GET_NAME_GAMES':
            return{
                ...state,
                games: action.payload
            }  
        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            }  
        case 'FILTER_BY_STATUS':
            const allGames = state.allGames
                const statusFiltered = action.payload === 'All' ? allGames : allGames.filter(el => el.status === action.payload)
                return{
                        ...state,
                        games: statusFiltered
                }  
        case 'POST_GAMES':
                 return{
                    ...state
                 }
                // ? es entonces// : es sino // es un ternario
        case 'FILTER_CREATED':
            const allGame2 = state.allGames
                const createFilter = action.payload === 'created' ? state.allGame2.filter(el => el.gamesdb) : state.allGame2.filter(el => !el.gamesdb)
                return{
                   ...state,
                   games: action.payload === 'All' ? state.allGame2 : createFilter // uso ternario
                }
        case 'ORDER_BY_NAME':
                let sortedArr = action.payload === 'asc' ?
                state.games.sort(function(a,b){
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.games.sort(function(a,b){
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                })        
                
                return{
                   ...state,
                   games: sortedArr // paso al estado el ordenamiento
            }
        default:
                return state;
        }
    }

export default rootReducer;