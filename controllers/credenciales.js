// ----------------------------------------------------------
// IMPORTANDO
// ----------------------------------------------------------

import "dotenv/config";
import jwt from "jsonwebtoken";

// ----------------------------------------------------------
// DECLARACION DE VARIABLES COMUNES
// ----------------------------------------------------------

const user_bd = "admin";
const password_bd = "1234";

// ----------------------------------------------------------
// FUNCION - verifyCredentials
// ----------------------------------------------------------

const verifyCredentials = function (token){
    if(jwt.verify(token, process.env.JWT_SECRETKEY)){

        const {user, password} = jwt.decode(token);

        if(user == user_bd && password == password_bd){

            return true;
        }
        else{

            return false;
        }
    }
    else{

        return false;
    }
}

// ----------------------------------------------------------
// FUNCION - login
// ----------------------------------------------------------

const login = async function (req, res){
    
    try{

        console.log(`credentialController.login: Start`);

        const {user, password} = await req.body;

        if(user == user_bd && password == password_bd){

            const payload = {user: user, password: password};
            const token = jwt.sign(payload, process.env.JWT_SECRETKEY, {expiresIn: process.env.TIME_EXPIRE_TOKEN});
            
            console.log(`credentialController.login: Login successfully`);
            return res.status(200).json({message:"Login successfully", result: token});
        }
        else{

            console.log(`credentialController.login: Invalid credentials`);
            return res.status(400).json({message:"Invalid credentials", result: null});
        }

    }
    catch(error){

        console.log(`credentialController.login: Internal server error`);
        return res.status(500).json({message: "Internal server error", result: error});
    }
    finally{

        console.log(`credentialController.login: End`);
    }
}

// ----------------------------------------------------------
// FUNCION - validateToken
// ----------------------------------------------------------

const validateToken = async function (req, res, next){

    console.log(`credentialController.validateToken: Start`);

    const Authorization = await req.header("Authorization");
    const token = Authorization.split(" ")[1];

    if(verifyCredentials){

        console.log(`credentialController.validateToken: Credentials validated`);
        console.log(`credentialController.validateToken: End`);
        next();
    }
    else{

        console.log(`credentialController.validateToken: Invalid credentials`);
        console.log(`credentialController.validateToken: End`);
        return res.status(400).json({message:"Invalid credentials", result: null});
    }
}


// ----------------------------------------------------------
// EXPORTANDO
// ----------------------------------------------------------

export const credentialController = {validateToken, login};