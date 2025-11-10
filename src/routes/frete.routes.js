const router = require('express-promise-router')();
const { Busca } = require('../controllers/frete.controller');
const auth = require('../middleware/auth');

router.get('/busca/',auth, Busca);

module.exports = router;
