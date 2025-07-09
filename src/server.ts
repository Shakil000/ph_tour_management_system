/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;


const startServer = async() => {
   try {
     await mongoose.connect("mongodb+srv://ph_toure:hIO60JFx4yk57FQh@cluster0.e4pmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0%22")

    console.log("Connected to DB!!")

    server = app.listen(5000, () => {
        console.log("Server is listening to port 5000")
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
