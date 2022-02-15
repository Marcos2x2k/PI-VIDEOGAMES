const { Router } = require('express');
const axios = require('axios');

const { game, genre, game_genre } = require('../db.js'); //importo los modelos conectados

const router = Router();

module.exports = router;