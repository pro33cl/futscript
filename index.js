
// ----------------------------------------------------------
// IMPORTANDO
// ----------------------------------------------------------

import express from 'express';
import cors from 'cors';
import "dotenv/config";
import { teamController } from './controllers/equipos.js';
import { playerController } from './controllers/jugadores.js';
import {credentialController} from './controllers/credenciales.js';

// ----------------------------------------------------------
// DECLARACION DE VARIABLES
// ----------------------------------------------------------

export const app = express();
const SERVER = process.env.SERVER || "http://localhost:";
const PORT = process.env.PORT || 3000;

// ----------------------------------------------------------
// MIDDLEWARES
// ----------------------------------------------------------

app.use(express.json());
app.use(cors());

// ----------------------------------------------------------
// LEVANTAR SERVIDOR
// ----------------------------------------------------------

app.listen(PORT, ()=>{
    console.log(`SERVER BACKEND ON, PORT: ${PORT}`);
    console.log(`Server: ${SERVER}${PORT}`);
});

// ----------------------------------------------------------
// RUTAS: GET
// ----------------------------------------------------------

app.get("/", (req, res) => {res.json({ message: "Welcome to futScript API", result: null})});
app.get("/equipos", credentialController.validateToken, teamController.obtenerEquipos);
app.get("/equipos/:teamID/jugadores", credentialController.validateToken, playerController.obtenerJugadores);

// ----------------------------------------------------------
// RUTAS: POST
// ----------------------------------------------------------

app.post("/login", credentialController.login);
app.post("/equipos", credentialController.validateToken, teamController.agregarEquipo);
app.post("/equipos/:teamID/jugadores", credentialController.validateToken, playerController.registrarJugador);

// ----------------------------------------------------------
// RUTAS NO ENCONTRADAS
// ----------------------------------------------------------

app.use((req,res)=>{
    return res.status(404).json({message:"Route not found", response: null});
});
