const express = require('express');
const router = express.Router();

const UserController = require('./controllers/UserController');

router.post('/usuario/login', UserController.LogarUsuario);
router.post('/usuario/cadastro', UserController.CadastrarUsuario);
router.put('/usuario/:codigo', UserController.AlterarUsuario);
router.delete('/usuario/:codigo', UserController.DeletarUsuario);

module.exports = router; 


