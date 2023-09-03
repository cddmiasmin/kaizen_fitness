const express = require('express');
const router = express.Router();

const UserController = require('./controllers/UserController');

router.get('/usuarios', UserController.ConsultarUsuarios);
router.get('/usuario/:codigo', UserController.ConsultarUsuario);
router.post('/usuario', UserController.CadastrarUsuario);
router.put('/usuario/:codigo', UserController.AlterarUsuario);
router.delete('/usuario/:codigo', UserController.DeletarUsuario);

module.exports = router; 


