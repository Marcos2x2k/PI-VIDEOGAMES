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
    try {
        // API:
        let gamesPage1 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`);
        let gamesPage2 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`);
        let gamesPage3 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`);
        let gamesPage4 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`);
        let gamesPage5 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`);

        let promiseALL = await Promise.all([gamesPage1, gamesPage2, gamesPage3, gamesPage4, gamesPage5]);                                            

        gamesPage1 = promiseALL[0].data.results;
        gamesPage2 = promiseALL[1].data.results;
        gamesPage3 = promiseALL[2].data.results;
        gamesPage4 = promiseALL[3].data.results;
        gamesPage5 = promiseALL[4].data.results;       

        let apiHtml = gamesPage1.concat(gamesPage2).concat(gamesPage3).concat(gamesPage4).concat(gamesPage5);                  
            
        let ApiInfo = apiHtml.map(p => {
        return { // ya la retorno con campos iguales a mi DB
        id: p.id,//.map(p=>p),
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
    } catch (error) {
    console.log(error);
    }
};

const getDbInfo = async () => {
    try {
        return await Games.findAll({
            include: {
                model: Genres,
                attributes: ['name'],
                through: {
                    attributes:[],
                },
            },
        });

    } catch (error) {
        console.log(error);
    }
    // return await Games.findAll({  //traigo la info de mi base de datos
    //     include: {  // ademas de todo traeme temperament 
    //         model: Genres,
    //         attributes: ['name'],
    //         through: { // va siempre en las llamadas y comprueba que llame atributo name en este caso 
    //             attributes: [],
    //         },
    //     }
    // })
};


const getAllGames = async () => {
    //const getAllVgames = async() => {
        try {
            const apiInfo = await getApiInfo();
            const dbInfo = await getDbInfo();            
            const infoTotal = apiInfo.concat(dbInfo);    
            // console.log("Soy infoTotal >>> ", infoTotal);
            return infoTotal;    
        } catch (error) {
            console.log(error);
        }
    };
//     const apiInfo = await getApiInfo();
//     const dbInfo = await getDbInfo();
//     const infoTotal = apiInfo.concat(dbInfo);
//     return infoTotal;
// };

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
    //var apiHtml = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY2}`)
    
    //API-2 de PRUEBA 
    //const url = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY2}`)   
    const genre = apiHtml.data.results.map(p => p.name)  

    const genres = await genre.filter(p => p.length > 0); // para verificar q no traiga nada vacio    
   
    //recorro todo buscando y me traigo los generos de la base de datos busca o lo crea si no existe
    genres.forEach(p => { if (p!==undefined) Genres.findOrCreate({where:{name:p}})})  

    const allGenres = await Genres.findAll();
    // console.log ("ALL API GENRE"+ genres)
    //console.log ("GENRES NAME"+ genreName)        
    // console.log ("ALL GENRES"+ allGenres)        
    res.send(allGenres);
    });
    

// router.get('/games?search={name}', async (req, res) => {});

router.get("/games/:id", async (req, res) => {
    const id = req.params.id;
    const GamesTotal = await getAllGames();    

    console.log (GamesTotal)

    if (id){
        const gamesId = await GamesTotal.filter((p) => p.id == id)

        // NOSE PORQUE ME TRAE CON OTROS ID DIFERENTES AL DE LA API
        console.log(gamesId)
        
        gamesId.length ? res.status(200).send(gamesId) : res.status(404).send('NO EXISTE EL JUEGO BUSCADO')        
    } 
});

router.post('/games', async (req, res) => {
    let{       
        name,        
        description,        
        platform,
        genres,
        image,
        createInDb,
    } = req.body // ** traigo lo q me pide por Body ** 

    let GamesCreated = await Games.create({ 
        name,        
        description,        
        platform,
        genres,
        image,
        createInDb,})
    
        let genresDb = await Genres.findAll({
            where: { name: genres }
        })
        GamesCreated.addGenres(genresDb)
        res.send('Video Juego Creado')
});


module.exports = router;
