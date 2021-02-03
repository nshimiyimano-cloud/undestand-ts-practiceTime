//to add Router middleware helps in routing endpoints

import {Router} from "express";  //normaly in node they say const Router=express.Router middleware

//to import our controller function to created todo
import {createTodo} from "../controllers/todos"
const router=Router(); //here we call it as function


//create our end points
router.post('/',createTodo)
router.get('/')

//to update

router.patch('/:id')

router.delete('/:id')


//then export this router as default in this file

export default router;
