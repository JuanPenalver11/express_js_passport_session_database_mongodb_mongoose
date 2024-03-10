import bcrypt from 'bcrypt';

const saltRounds = 10; 
// Define el número de rondas de sal que se utilizarán durante el proceso de hashing.
//  La sal es una cadena aleatoria que se añade a la contraseña antes de realizar el hash, 
// lo que aumenta la seguridad del hash

export const hashPassword = (password) =>{
    const salt = bcrypt.genSaltSync(saltRounds)
    // genSaltSync genera una sal aleatoria que se utilizará para 
    //mezclar con la contraseña antes de realizar el hash
    return bcrypt.hashSync(password, salt)
};

export const comparePassword = (plain, hashed) =>{
    return bcrypt.compareSync(plain, hashed);
    //compareSync es una funcion que va a comparar la password sin encriptar y la encriptada. 
    // si coinciden devolvera true si no false. 
}