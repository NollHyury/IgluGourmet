import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";

//connects to the DATABASE => then starts the express
createConnection()
    .then(async connection => {
        //Create a new express application instance
        const app = express();
        app.use(cors())
        app.use(helmet())
        app.use(bodyParser.json())

        //Set all routes from routes folder
        app.use("/",routes);

        app.listen(3000,() =>{
            console.log("server started on port 3000!");
        })
    }) .catch(err => console.log(err));