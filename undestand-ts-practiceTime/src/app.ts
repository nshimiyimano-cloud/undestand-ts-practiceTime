// Code goes here!

//we gonna add project type  that our classes in our app will use
//we define enum type here to define our status

enum projectStatus {
Active,
Finished
}
class Project{

    constructor(public id:string,
        public title:string,
        description:string,
        public people:number,
        public status:projectStatus      //here we should use literal union type 'active'|'finished' but a good here is to use enum type
        ) {  

    }
}


//project state management


//and we have to fix problem to use any[] on our listeners array as type we create custom type here to replace any[]
//we want to encode function type with a one word(Listener)

type Listener=(items:Project[])=>void; //w'll equal to function that w'll take items of project as parameter, this void means don't care about type w'll return



class ProjectState{

    //we wnat to add listener method to manage list of listener  at the end is function which called when some thing changes

private listeners:Listener[]=[];   //here instead of use any[] we use Listener[] custom type
    private projects:Project[]=[];  //here instead of any[] we use our project type contains all properties project w'll need

    

    private static instance:ProjectState;

 //private constructor to get garantee of single ton
 private constructor(){

}

static getInstance(){
    if(this.instance){
        return this.instance;
    }
    else{
this.instance=new ProjectState();
return this.instance;
    }
}

addListener(listenerFn:Listener){   //any here instead of use :Function we use our custom type Listener instead of use any[]

    //we push our listener function 2 our listener array

    this.listeners.push(listenerFn);


  


}





   

    addProject(title:string,description:string,numOfPeople:number){  //called when we click add project Button


        /* const newProject={
            id:Math.random().toString(),
            title:title,
            description:description,
            people:numOfPeople
        };        instead of above we use our project type*/


        const newProject=new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            projectStatus.Active  //here we wantb that our project its status will be active by default
        )

        this.projects.push(newProject);

          //we gonna call all listeners when sth changes like here to add new project

    for(const listenerFn of this.listeners){

        //we pass project here and copy this project array with slice take copy of array but not change orginal array
        listenerFn(this.projects.slice())
    }
    }
}

//then we create global constant that can be used any where
//const projectState=new ProjectState();  instead of this we create obj with our getInstance static method

const projectState=ProjectState.getInstance();  //this object will be accessed every where in app



//codes to render project list

class ProjectList{


//we lend some properties from projectInput class
templateElement:HTMLTemplateElement;
    hostElement:HTMLDivElement;
    element:HTMLElement;   //we give typ of this here becouse each el above has type of html element  we not say htmlSectionElmt


    assignedProjects:Project[];   //and here any[] type we replace it with Project[] type


    constructor(private type: 'active' |'finished'){

        this.templateElement =document.getElementById('project-list')! as HTMLTemplateElement; //here we use typecasting to recorganize template type to ts //to get our content in inside the template
        this.hostElement=document.getElementById('app')! as HTMLDivElement  //where content inside our template be rendersed  if<ss> not still display err use as ..
        
        //we gonna initialise assignedproject in this construct if not this below we see an error
        
        this.assignedProjects=[];


        //we gonna store imported node in variable


        const importedNode=document.importNode(this.templateElement.content,true); //to access el we need other property eg elemetnt
        this.element=importedNode.firstElementChild as HTMLElement; //here we use firstElemChild becouse <section> tag is the first el in our template
    //to excute our attach logic we call attach() private method in this constructor
    
    //to add id property=user-input  to our form to be able take styles of form from app.css 
    this.element.id=`${this.type}-projects`;   //here id will be dynamically because we awant to render different project list finished project & active project
    


    //before we attach we call addListerner call whenever changes done

    projectState.addListener((projects:Project[])=>{  //and here we use our custom type Project instead opf use any[] here  //projects is like list of our projects
  

        //we gonna filter or get project depend on its status

        const relevantProject=projects.filter((prj)=>{

            if(this.type==='active'){   //we check for its type
                return prj.status===projectStatus.Active;
            }
            return prj.status===projectStatus.Finished;
        })

        //then assign filtrated project to assignedProject
        this.assignedProjects=relevantProject;
       this.renderProjects();

        //so now we end to add  project which i get when something changed in my state
    })

this.attach();

//then we render content after we attach out elements to our dom
this.renderContent();



    }



    //we gonna render our project to domm

    private renderProjects(){
        const listEl= document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        
//to fix probl of rerender project(or list element(li)) again we set empty string to clear all its content  already stored in listEl to clear it
listEl.innerHTML='';

        //we want to render all project items of this assingedproject
for(const prjItems of this.assignedProjects){

    const listItem=document.createElement('li');
    listItem.textContent=prjItems.title;
   
    listEl.appendChild(listItem);
    
}



    }
    //here we want to render blank spaces or empty elements are in this template
    private renderContent(){
//here we want to assign dynamically id for our unordered list depending on project type if finished or act
const listId=`${this.type}-projects-list`;
//we gonna assign our listid to our UL eement
this.element.querySelector('ul')!.id=listId;



//we gonna attach text content to our h2 elemengt
this.element.querySelector('h2')!.textContent=this.type.toUpperCase()+' PROJECTS'
    }


    private attach(){
        this.hostElement.insertAdjacentElement('beforeend',this.element); // afterbegin meansinsert it to beginning of opening tag  //insertAdjacEl is to insert html element &inser adjacent elem first af all description of where we insert it eg if is after or before then content we want to insert as secont argument



    }
}









//we gonna expand input validation with interface

interface validatable{
value:string | number,
required?:boolean,
minLength?:number,
maxLength?:number,
min?:number,
max?:number        //to add ? is to make this properties option allow for undefined values is like to say min:number |undefined;
}

//use above type interface in this function
function validate(validatableInput:validatable){
    //we use  isValid as to chech is validation pass or fails
    let isValid=true;

    if(validatableInput.required){
        
isValid=isValid && validatableInput.value.toString().trim().length !==0;  //here we get err becouse trim&lenght ts not know its type  we use toString() to change to str or for this we use type guard to check
        
}

if(validatableInput.minLength !=null && 
    typeof validatableInput.value==='string') { //!=0 is to prevent minlength of 0 atleast 1   //here we check if minLenth is not set to undefined or zero and if is string as type guard that means if type=number skip this check
   
    isValid=isValid && validatableInput.value.length >= validatableInput.minLength;


}

if(validatableInput.maxLength !=null && 
    typeof validatableInput.value==='string') { //!=0 is to prevent minlength of 0 atleast 1   //here we check if minLenth is not set to undefined or zero and if is string as type guard that means if type=number skip this check
   
    isValid=isValid && validatableInput.value.length <= validatableInput.maxLength;


}

if(validatableInput.min !=null && typeof validatableInput.value==='number'){ //to make sure validatableInput must not be 0 or nul or undefined and must be type of number if stri skip this check
isValid=isValid && validatableInput.value >= validatableInput.min;
}

if(validatableInput.max != null && typeof validatableInput.value==='number'){

    isValid=isValid && validatableInput.value <= validatableInput.max
}
    return isValid;
}

//we gonna add autobind decorator here

function autobind(_:any,methodName:string,descriptor:PropertyDescriptor)
{
const originalMethod=descriptor.value;
const adjDescriptor:PropertyDescriptor={
    
    configurable:true,

    
    get(){
        const boundFn=originalMethod.bind(this);
        return boundFn;
    }

    
};

return adjDescriptor;

}
//first of all we gonna make our html code to be rendered
//we create class to render templete with project-input id and our div id='app'

class ProjectInput{
    templateElement:HTMLTemplateElement;
    hostElement:HTMLDivElement;
    element:HTMLFormElement;
titleInputElement:HTMLInputElement;
descriptionInputElement:HTMLInputElement;
peopletitleInputElement:HTMLInputElement;
    //we need to getdiffenrent input elemt to make manipulation
constructor(){

    this.templateElement =document.getElementById('project-input')! as HTMLTemplateElement; //here we use typecasting to recorganize template type to ts //to get our content in inside the template
    this.hostElement=document.getElementById('app')! as HTMLDivElement  //where content inside our template be rendersed  if<ss> not still display err use as ..
    //we gonna store imported node in variable
    const importedNode=document.importNode(this.templateElement.content,true); //to access el we need other property eg elemetnt
    this.element=importedNode.firstElementChild as HTMLFormElement; //here we use firstElemChild becouse <form> tag is the first el in our template
//to excute our attach logic we call attach() private method in this constructor

//to add id property=user-input  to our form to be able take styles of form from app.css 
this.element.id='user-input';

this.configure();

this.attach();

//to populate our inputs in constructor
//all to get it we pass though our imported element(this.element) eg as title we use #tile as its id
this.titleInputElement=this.element.querySelector('#title') as HTMLInputElement;
this.descriptionInputElement=this.element.querySelector('#description') as HTMLInputElement;
this.peopletitleInputElement=this.element.querySelector('#people') as HTMLInputElement;
//after above we get all element in this class

}





//method to get userInput
private gatherUserInput():[string,string,number] | void{   //this void means can return tuple or nothing(like undefined) becouse if no result error found return empty
    const enteredTitle=this.titleInputElement.value;
    const enteredDescription=this.descriptionInputElement.value;
    const enteredPeople=this.peopletitleInputElement.value;




    //if we have used class we should use  instantiate with new keyword but now becouse we use interface we do like below

    const titleValidatable:validatable={
        value:enteredDescription,
        required:true
    }

    const descriptionValidatable:validatable={
        value:enteredDescription,
        required:true,
        minLength:5
        
    }

    const peopleValidatable:validatable={
        value:+enteredPeople,
        required:true,
        min:1,
        max:5
    }


    if(
    !validate(titleValidatable) ||
    !validate(descriptionValidatable) ||   //! and || means if there is one not valid alert error
    !validate(peopleValidatable)){
         alert('invalid Input!, try Again');
         return;   //here if not |void here we get err becouse void is like undefined means if error found return empty no tuple
     }

     //else return our tuple
     return [enteredTitle,enteredDescription,+enteredPeople]; //we add + to change into number type
}

//to make validation veryclear we gonna add method to clear after submit value directly clear it

private clearInput(){
    this.titleInputElement.value='';
    this.descriptionInputElement.value='';
    this.peopletitleInputElement.value='';
}






//here we gonna add priv method that w'll allow us to render our selected content from our template to our dom(contains rendering logic)

@autobind

private submitHandler(event:Event){
    event.preventDefault();//to not submit empty httprequest
   // console.log(this.titleInputElement.value); we call our method to get it instead this
  const userInput=this.gatherUserInput();   // if you hover on this see'method) ProjectInput.gatherUserInput(): void | [string, string, number]'
   

  //here we have to check if userInput is tuple but we see earlier tuple is 100% like array in vanila javascript we have not to say if typopOf userInput==='tuple not belong in js and not say if(instance of userInp===tuple) therefore we check with if(Array.isArray(userInput)) nice becouse this Array constructor understood by vanil js not give err at runtime it's known
  if(Array.isArray(userInput)){
    //we gonna extract our element values in array before we console it
    const [title,description,people]=userInput
    console.log(title,description,people);

    //we gonna call our addProject method found in projectState class
    projectState.addProject(title,description,people); //now new project shoulkd be created we need to push this informa(new project) to our project list class because that's class which is responsible for outputting some thing to screen

    //after submit clear value in our input
    this.clearInput();
  }

}


//we gonna create other configure() private method that contains add eventListenner when our form element gonne submitted



private configure(){
    //to add event to our form
    this.element.addEventListener('submit',this.submitHandler);//this in bind means will refer to the class
}


 private attach(){

this.hostElement.insertAdjacentElement('afterbegin',this.element); // afterbegin meansinsert it to beginning of opening tag  //insertAdjacEl is to insert html element &inser adjacent elem first af all description of where we insert it eg if is after or before then content we want to insert as secont argument
}
}

//if we instatiate our class into object directly we see our form were in template as hidden content
const prjInput= new ProjectInput();

//we goone instatiate our projectList claa with project type argument

const activepProjectList=new ProjectList('active');
const finishedProjectList=new ProjectList('finished');