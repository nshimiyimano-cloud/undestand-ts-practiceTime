
//we want to use this class in app.ts

import {IsNumber,IsNotEmpty,IsPositive} from "class-validator";
export class Product{
    @IsNotEmpty()
    title:string;

    @IsNumber()
    @IsPositive()
    price:number;
    constructor(t:string,p:number){
        this.title=t;
        this.price=p;
    }

    getInformation(){
        return [this.title,`$${this.price}`];;
    }
}

