const { Router } = require('express');
const axios = require('axios');

const { Games, Genres, Game_genre } = require('../db.js'); //importo los modelos conectados

const router = Router();

module.exports = router;