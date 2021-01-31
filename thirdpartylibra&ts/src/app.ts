


import 'reflect-metadata';
import { plainToClass } from 'class-transformer'; 

import {validate} from "class-validator";


import {Product} from "./product.model"

//eg if you want to get as json data forex if you get data from backend
const products=[

    {title:"A Carpet",price:29.99},
    {title:"A BOOK",price:10.99}
];
//const p1=new Product('A Book',12.99);
//console.log(p1.getInformation());

//const loadedProducts=products.map(prod=>{return new Product(prod.title,prod.price)});
const loadedProducts=plainToClass(Product,products);


const newProd=new Product('',-30.99);
console.log(newProd);

validate(loadedProducts).then(errors=>{
    if(errors.length>0){
        console.log('THE VALIDATIONS ERRORS OCCUR HERE:');
        console.log(errors);
    }
    else{
        for(const produc of loadedProducts){
            console.log(produc.getInformation());
        }
    }
})


validate(newProd).then(errors=>{
    if(errors.length>0){
        console.log('THE VALIDATIONS ERRORS OCCUR HERE:');
        console.log(errors);
    }
    else{
        console.log(newProd.getInformation());
    }
})




