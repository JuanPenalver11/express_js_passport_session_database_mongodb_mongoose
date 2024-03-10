import mongoose from "mongoose"

//mongoose schema se utiliza para fijar el tipo de datos que 
//serán aceptados en nuestra username debe ser una string por ejemplo. 
const UserSchema = new mongoose.Schema({
    username: {
        type: String,// se utiliza para fijar el tipo de informacion
        required:true, // se utiliza para que este campo sea obligatorio
        unique:true, // se utiliza para que sea unico y no pueda haber duplicados
    },
    displayName: String,
    password: {
        type: String,
        required:true
    },
});

// es necesario compilar (pasar codigo fuente [JavaScript] a codigo maquina)
 export const UserModel = mongoose.model('UserModel', UserSchema);
 //'UserModel' es el nombre de la carpeta que almacenara los nuevos usuarios en 
 //mongoDB compass 