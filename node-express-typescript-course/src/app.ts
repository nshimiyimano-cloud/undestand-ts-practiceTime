//const express=require('express');  //we need to install type definition of translator @types/node package to ts understand require() & all used by nodejs
//and you can do like this in typescript


//to connect our route with app
import todoRoutes from "./routes/todos";


import {json} from  "body-parser";

//we have to make sure that the properties which we have extracted  actually exist we do that with use body parser package that have our json()  method


import express,{Request,Response,NextFunction} from "express";


const app=express();

//to register json as middle ware
app.use(json());

//to use our todoRoutes middleware

app.use('/todos',todoRoutes);   //all request that start with '/todoes' will use todoRoutes
app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{   //if you not import these express properties above do like this  (err:Error,req:express.Request,res:express.Response,next:express.NextFunction) eg import express from "express"

res.status(500).json({message:err.message});
})

app.listen(3000);