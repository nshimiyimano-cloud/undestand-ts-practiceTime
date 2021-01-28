// Code goes here!
//to import namesp in ts done like below start with /// not as comment these understood by ts as to import namespace


//now this DDInterfaces available in app.ts


/// <reference path="models/drag-drop.ts"  />   
/// <reference path="models/project.ts"  /> 

//to import project-state 
/// <reference path="state/project-state.ts"  /> 

//to import our validation.ts contains validation interface and function validate for validating our inputs


/// <reference path="components/project-input.ts"  /> 
/// <reference path="components/project-list.ts"  /> 

//we import only these 2 files we'll not get runtim error becouse its own module has all modules that will need to use




//we gonna add project type  that our classes in our app will use
//we define enum type here to define our status


namespace App{   //now becouse we create the same as in drag-drop-interfaces.ts file no error


//if we instatiate our class into object directly we see our form were in template as hidden content
 new ProjectInput();
//we goone instatiate our projectList claa with project type argument

 new ProjectList('active');
 new ProjectList('finished');


    }