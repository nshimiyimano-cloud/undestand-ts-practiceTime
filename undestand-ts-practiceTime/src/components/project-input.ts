//because this class will need extends Component we have to import it in this project-item.ts

///<reference path="base-component.ts"  />
///<reference path="../decorators/autobind.ts"  />
///<reference path="../util/validation.ts"  />
///<reference path="../state/project-state.ts"  />


namespace App{

//first of all we gonna make our html code to be rendered
//we create class to render templete with project-input id and our div id='app'


//and here we can inherit our componet
 export class ProjectInput extends Component<HTMLDivElement,HTMLFormElement>{

    /* three element got rid to use them becouse defined in base class tepmate,hostelement &element we rely with those below because its specific */
       titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopletitleInputElement: HTMLInputElement;
    //we need to getdiffenrent input elemt to make manipulation
    constructor() {
       
        //we use super to call base cunstructor
        super('project-input','app',true,'user-input')//(templateElement,hostElement,insertAtStart,newElementId) //here we set true becouse we want to appen el at begin('afterbegin)


        //to populate our inputs in constructor
        //all to get it we pass though our imported element(this.element) eg as title we use #tile as its id
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopletitleInputElement = this.element.querySelector('#people') as HTMLInputElement;
        //after above we get all element in this class







        //see code removed here becouse to inheriting base class
        this.configure();

        // this.attach();  we remove this because ins in base

       
    }

    configure() {

        //to add event to our form
         this.element.addEventListener('submit', this.submitHandler);//this in bind means will refer to the class
     }
renderContent(){} //and here no imlementation




    //method to get userInput
    private gatherUserInput(): [string, string, number] | void {   //this void means can return tuple or nothing(like undefined) becouse if no result error found return empty
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopletitleInputElement.value;




        //if we have used class we should use  instantiate with new keyword but now becouse we use interface we do like below

        const titleValidatable: validatable = {
            value: enteredDescription,
            required: true
        }

        const descriptionValidatable: validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5

        }

        const peopleValidatable: validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }


        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||   //! and || means if there is one not valid alert error
            !validate(peopleValidatable)) {
            alert('invalid Input!, try Again');
            return;   //here if not |void here we get err becouse void is like undefined means if error found return empty no tuple
        }

        //else return our tuple
        return [enteredTitle, enteredDescription, +enteredPeople]; //we add + to change into number type
    }

    //to make validation veryclear we gonna add method to clear after submit value directly clear it

    private clearInput() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopletitleInputElement.value = '';
    }






    //here we gonna add priv method that w'll allow us to render our selected content from our template to our dom(contains rendering logic)

    @autobind

    private submitHandler(event: Event) {
        event.preventDefault();//to not submit empty httprequest
        // console.log(this.titleInputElement.value); we call our method to get it instead this
        const userInput = this.gatherUserInput();   // if you hover on this see'method) ProjectInput.gatherUserInput(): void | [string, string, number]'


        //here we have to check if userInput is tuple but we see earlier tuple is 100% like array in vanila javascript we have not to say if typopOf userInput==='tuple not belong in js and not say if(instance of userInp===tuple) therefore we check with if(Array.isArray(userInput)) nice becouse this Array constructor understood by vanil js not give err at runtime it's known
        if (Array.isArray(userInput)) {
            //we gonna extract our element values in array before we console it
            const [title, description, people] = userInput
            console.log(title, description, people);

            //we gonna call our addProject method found in projectState class
            projectState.addProject(title, description, people); //now new project shoulkd be created we need to push this informa(new project) to our project list class because that's class which is responsible for outputting some thing to screen

            //after submit clear value in our input
            this.clearInput();
        }

    }


    //we gonna create other configure() private method that contains add eventListenner when our form element gonne submitted



   


    
}

}