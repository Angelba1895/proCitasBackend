const Doctor = require('../models/Doctor');

//Funcion agregar doctores
exports.agregarDoctores = async(req, res) => {

    try {
        
        let Doctores
        Doctores = new Doctor(req.body);
        await Doctores.save();
        res.send(Doctores);    

    } catch (error) {
       console.log(error);
       res.status(500).send('Hubo un error al agregar un doctor'); 
    }

}

//Crear una funcion que nos va a mostrar todos los doctores
exports.mostrarDoctores = async(req, res) => {

    try {

        const Doctores = await Doctor.find();
        res.json(Doctores);


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al mostrar los doctores');        
    }
}

//Funcion para mostrar un doctor
exports.buscarDoctor = async(req, res) => {

    try {

        const doctor = await Doctor.findById(req.params.id);

        if(!doctor){
            res.status(404).json({msg: 'No se encuentra el doctor'});
        }else{
            res.json(doctor);
        }
        

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al consultar el doctor');        
    }
}

//Funcion para actualizar un doctor
exports.actualizarDoctores = async(req, res) => {
    try {
        const doctor = await Doctor.findOneAndUpdate(
            {_id: req.params.id},req.body);
        
        if(!doctor) res.status(404).send("Doctor no encontrado");
        else
        res.json(doctor);    
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al actualizar el doctor');
    }
};

//Funcion para modificar un doctor
exports.modificarDoctores = async(req, res) => {
    
    try{
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if(!doctor){
            return res.status(404).send('Doctor no encontrado');
    }
    res.json(doctor)
    }catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar el doctor') ;
    }
}


//Funcion para eliminar un doctor
exports.eliminarDoctores = async(req, res) =>{
    try {
        let Doctores = await Doctor.findById(req.params.id);
        if(!Doctores){
            res.status(404).send('Doctor no encontrado');
        }else{
            await Doctor.findOneAndDelete({_id: req.params.id});
            res.json({msg: 'El doctor ha sido eliminado'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al eliminar el doctor') ;
    }
}

