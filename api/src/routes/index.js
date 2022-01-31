const { Router } = require('express');
// Importar todos los routerrs;
// Ejemplo: const authrouterr = require('./auth.js');
const axios = require('axios');


// aca defino models y me los traigo de la BD
const { Games, Genres, Game_genre } = require('../db.js'); //importo los modelos conectados
const {API_KEY} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    // api en navegador https://api.rawg.io/api/games?key=568655144cbd472f91f71519a75eac0e
    const apiHtml = await axios (`https://api.rawg.io/api/games?key=${API_KEY}`)
    //const apiHtml = await axios.get('https://api.rawg.io/api/games?key=${API_KEY}')

    //, {headers: {'x-api-key': `${API_KEY}`}});
    //tengo que mapear si o si toda la info que me trae desde la Api
    const ApiInfo = apiHtml.data.results.map(p => {    
    return { // ya la retorno con campos iguales a mi DB
        id: p.id,
        name:p.name,        
        description:p.description,        
        platform:p.platforms.map(p=>p),
        genres:p.genres.map(p=>p),
        image:p.background_image,
        //released:released, //Fecha de lanzamiento
        //rating: p.rating,
        //ratings: ar.ratings.map(a=>a),        
    }    
    })
    return ApiInfo;
};

const getDbInfo = async () => {
    return await Games.findAll({  //traigo la info de mi base de datos
        include: {  // ademas de todo traeme temperament 
            model: Genres,
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

// router.get('/', async (req, res) => {
//     const name = req.query.name
//     if (!name) {
//         return res.status(200).send(await getAllGames());
//     }else {
//         const game = getAllGames.filter(e=>e.name.toLowerCase().include(name));
//         return res.status(200).send(game);
//     }
// })
// [ ] GET /videogames:
// Obtener un listado de los videojuegos, Debe devolver solo los datos necesarios para la ruta principal
router.get('/games', async (req, res) => {
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
    var apiHtml = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    // ** para llamar por plataforma
    //var apiHtml = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`)
    
    //API2 de PRUEBA 
    //const url = await axios.get(`https://api.rawg.io/api/games?key=6d62af1479864f0cae7616fd7e10a7d2`)   
    const genre = apiHtml.data.results.map(p => p.name)  

    const genres = await genre.filter(p => p.length > 0); // para verificar q no traiga nada vacio
    
    // console.log("GENRES DEL FILTER" + genresName);
    //recorro todo buscando y me traigo los generos de la base de datos busca o lo crea si no existe
    genres.forEach(p => { if (p!==undefined) Genres.findOrCreate({where:{name:p}})})  

    const allGenres = await Genres.findAll();
    console.log ("ALL API GENRE"+ genres)
    //console.log ("GENRES NAME"+ genreName)        
    console.log ("ALL GENRES"+ allGenres)        
    res.send(allGenres);
    });
    

// router.get('/games?search={name}', async (req, res) => {});

// router.get('/games/:id', async (req, res) => {});

// router.post('/allGames', async (req, res) => {});


module.exports = router;
