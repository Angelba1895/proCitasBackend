const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {

    //Leer el token del header
    const token = req.header("x-auth-token");


//Revisar si tenemeos un token
if(!token) {
    return res.status(400).json({msg: 'No hay un token, permiso no valido'});
}

//Validar el token
try {
    const cifrado = jwt.verify(token, process.env.SECRETA)
    req.usuario = cifrado.usuario;
    next();
} catch (error) {
    res.status(400).json({msg:"token no valido"});
}
}