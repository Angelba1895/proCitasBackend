const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async(req, res) => {
    //Vamos a revisar errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errors: errores.array()});
    }

    const {email, password} = req.body;
    
    try {
        //Revisar que el usuario este registrado

        let usuario = await Usuario.findOne({email}); 
        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe'});
        }

        //Revisamos el password
        const passok = await bcryptjs.compare(password, usuario.password);
        if(!passok){
            return res.status(400).json({msg: 'Contraseña incorrecta'});
        }

        //Si todo es correcto, creamos y firmamos el token

          //Firmar el JWT
          const payload = {
            usuario: {id: usuario.id},
        };

        jwt.sign(
            payload, process.env.SECRETA, 
            {
                expiresIn: 3600, //1 Hora
            },
            (error, token) => {
                if(error) throw error;

                //Mensaje de confirmación
                res.json({token});
            }
        );
        
    } catch (error) {
        console.log("Hubo un error");
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports .usuarioAutenticado = async(req, res) =>{
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({usuario});
    } catch (error) {
        res.status(500).send({msg: 'Hubo un error'});
    }
}