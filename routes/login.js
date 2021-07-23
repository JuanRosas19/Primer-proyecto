const express = require('express');
const router = express.Router();

const loginModel = require("../models/login");

router.get('/', function (req, res, next) {
    res.render("login/login");
});
router.post('/login', function (req, res, next) {
   
    const { usuario, clave } = req.body;
    if (!usuario || !clave) {
        return res.status(500).send("No hay Usuario o Clave");
    }
    loginModel
        .buscarusuario(usuario, clave)
        .then(login => {
			if (login) {
			req.session.loggedin =true;
			req.session.usuario = usuario;
            res.redirect("/productos");
			}
			else {
				res.send('Usuario o Password Incorrecto');
			}
			})
        .catch(err => {
            return res.status(500).send("Error al ingresar. Vuelve a intentarlo");
        });
			
});

module.exports = router;
