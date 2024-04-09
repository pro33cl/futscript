import request from "supertest";
import { app } from "../index.js";

describe("pruebas N°1",()=>{

   let token = "";

    /*
    Al enviar las credenciales correctas en la ruta POST /login se obtiene un Object
    */

    it("POST /login - credenciales correctas", async () => {
        
        const response = await request(app).post("/login").send({user:"admin", password: "1234"});
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        token = await response.body.result;
        }
    );

    /*
    Al enviar credenciales incorrectas en la ruta POST /login se obtiene un status code 400
    */

    it("POST /login - credenciales incorrectas", async () => {
        
        const response = await request(app).post("/login").send({user:"incorrecto", password: "incorrecto"});
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        }
    );

    /*
    Se obtiene un Array y un status code 200 como respuesta de la ruta GET /equipos
    */

    it("GET /equipos/ - credenciales correctas", async () => {
        
        const response = await request(app).get("/equipos").set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.result).toBeInstanceOf(Array);
        }
    );

    /*
    Al enviar un nuevo jugador en la ruta POST /equipos/:teamID/jugadores junto a un token válido en las cabeceras se obtiene un status code 201.
    */

    it("POST /equipos/:teamID/jugadores - credenciales correctas", async () => {
        
        const teamID = 1;
        const nombreJugador = "Gonzalo";
        const idPosition = 2;

        const response = await request(app).post(`/equipos/${teamID}/jugadores`).send({name: nombreJugador, position: idPosition}).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(201);
        }
    );

});