// Code goes here!


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

    if(enteredTitle.trim().length===0 
    || enteredDescription.trim().length===0
     || enteredPeople.trim().length===0){
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