/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;


const startServer = async() => {
   try {
     await mongoose.connect(envVars.DB_URL)

    console.log("Connected to DB!!")

    server = app.listen(envVars.PORT, () => {
        console.log(`Server is listening to port ${envVars.PORT}`)
    })
   } catch (error) {
    console.log(error);
   }
}

startServer();

//! server unhandled rejection handled here.................
process.on("unhandledRejection", (err) => {
    console.log("Unhandled rejection detected...Server shutting down...", err)

    if(server){
        server.close( () => {
            process.exit(1);
        })
    }
    process.exit(1);
});
// Promise.reject(new Error("I forgot to handle the error"));

// ! server uncaught exception error handled here..................
process.on("uncaughtException" ,(err) => {
    console.log("UnCaught exception detected....Server shutting down....", err)

    if(server){
        server.close( () => {
            process.exit(1);
        })
    }
    process.exit(1);
});
// throw new Error("uncaught exception error");

// ! Signal SIGTERM error handled here..................
process.on("SIGTERM", () => {
    console.log("Sigterm signal error.....Server shutting down....")
    if(server){
        server.close( () => {
            process.exit(1);
        })
    }
    process.exit(1);
})

// ! Signal SIGINT error handled here..................
process.on("SIGINT", () => {
    console.log("Sigint signal error.....Server shutting down....")
    if(server){
        server.close( () => {
            process.exit(1);
        })
    }
    process.exit(1);
})
