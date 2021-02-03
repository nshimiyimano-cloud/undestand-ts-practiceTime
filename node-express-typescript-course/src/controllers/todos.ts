import { RequestHandler } from "express"; //here is to import type for our 3params  //{Request,Response,NextFunction} replaced by RequestHundler do all


//to import our model
import {Todo} from "../models/todo";

//here we set it will be arrray of Todo class
const TODOS:Todo[]=[];  //help to manage oiur todos just like in place of database

export  const createTodo:RequestHandler=(req,res,next)=>{    //this is annoying to say param:type eg req:Request   we fix it by import RequestHandler which allows this params to be recorganised without provide type to each param

//text will from reqest body which user will send
    const tex=(req.body as {text:string}).text;  //here if you hover on text const you see has type of any ts does not now has type of string to fix that we use typecastin(req.body as {text:string}) to tell will be a string
    const newTodo=new Todo(Math.random().toString(),tex);

    TODOS.push(newTodo);

    //here we want to return response as json

    res.status(201).json({message:"created the todo",createTodo:newTodo});  //we give it status=2001 which indicate that were succeswsfully and resource was created
}