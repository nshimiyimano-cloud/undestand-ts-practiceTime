// Code goes here!
//to import namesp in ts done like below start with /// not as comment these understood by ts as to import namespace

import {ProjectInput} from "./components/project-input";
import {ProjectList} from "./components/project-list";





//we gonna add project type  that our classes in our app will use
//we define enum type here to define our status




//if we instatiate our class into object directly we see our form were in template as hidden content
 new ProjectInput();
//we goone instatiate our projectList claa with project type argument

 new ProjectList('active');
 new ProjectList('finished');
 console.log('hi!');


    