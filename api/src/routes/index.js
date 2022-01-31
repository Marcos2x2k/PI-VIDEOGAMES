const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');


// aca defino models y me los traigo de la BD
const { Game, Genre, Games_genres } = require('../db.js'); //importo los modelos conectados
const {API_KEY} = process.env;

const route = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    // api en navegador https://api.rawg.io/api/games?key=568655144cbd472f91f71519a75eac0e
    const apiHtml = await axios ('https://api.rawg.io/api/games?key=568655144cbd472f91f71519a75eac0e')
    //const apiHtml = await axios.get('https://api.rawg.io/api/games?key=${API_KEY}')

    //, {headers: {'x-api-key': `${API_KEY}`}});
    //tengo que mapear si o si toda la info que me trae desde la Api
    const ApiInfo = apiHtml.data.results.map(p => {    
    return { // ya la retorno con campos iguales a mi DB
        id: p.id,
        name:p.name,        
        description:p.description,
        //released:released, //Fecha de lanzamiento
        //rating: p.rating,
        platform:p.platforms,
        //genre:p.genres,
        image:p.background_image,
    }
    })
    return ApiInfo;
};

const getDbInfo = async () => {
    return await Game.findAll({  //traigo la info de mi base de datos
        include: {  // ademas de todo traeme temperament 
            model: Genre,
            attributes: ['name'],
            through: { // va siempre en las llamadas y comprueba que llame atributo name en este caso 
                attributes: [],
            },
        }
    })
};


const getAllGames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};
// [ ] GET /videogames:
// Obtener un listado de los videojuegos, Debe devolver solo los datos necesarios para la ruta principal
route.get('/games', async (req, res) => {
    const name = req.query.name;
    const gamesAll = await getAllGames();
    if (name) {
        //tolowerCase hace que la busqueda en minus/mayusc no afecte al resultado
        const gamesName = await gamesAll.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
        gamesName.length? // preguntamos si hay algo
            res.status(200).send(gamesName) 
            :
            res.status(404).send('NO EXISTE EL JUEGO BUSCADO');
    }else{
        res.status(200).send(gamesAll)
    }
});

router.get('/genres', async (req, res) => {
    const apiHtml = await axios ('https://api.rawg.io/api/games?key=568655144cbd472f91f71519a75eac0e')
    const genres = apiHtml.data.map(p => p.genre)
    const splitgenre = await genres.filter(p => p.length > 0);

    //console.log (splitgenre) //compruebo lo q trae
    splitgenre.forEach(p => {
        console.log (p)
        // me traigo los temperamentos de la base de datos busca o lo crea si no existe
        if (p !== undefined) Genre.findOrCreate({ where: { name: p } })
            const allgenre = await Genre.findAll();
            res.send(allGenre);
});

router.get('/games?search={name}', async (req, res) => {});

router.get('/games/:id', async (req, res) => {});

router.post('/allGames', async (req, res) => {});


module.exports = route;
