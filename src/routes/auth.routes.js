const router = require('express-promise-router')();
const {
  signinHandlerToken,
  refreshHandler,
} = require('../controllers/auth.controller');

router.post('/login/', signinHandlerToken);
router.post('/refresh/', refreshHandler);

module.exports = router;
