// Code goes here!

//utilizing interface to implement drag and drop

interface Draggable{
    dragStartHandler(event:DragEvent):void;
    dragEndHanler(event:DragEvent):void;
}


interface DragTarget{
dragOverHandler(event:DragEvent):void; //signal the browser and javascript that the thing you're dragging something over is a valid drag target. If you don't do the right thing in the drag over handler dropping will not be possible.
dropHandler(event:DragEvent):void; //You need to drop handler then to react to the actual drop that happens. here you can update UI(user interface)
dragLeaveHandler(event:DragEvent):void; //example giving some visual feedback to the user when he or she drag something over the box.For example we change the background color.Well if no drop happens and instead it's cancelled or the user removes the element away we can use thedrag leaf handler to revert our visual update.
}

//we gonna add project type  that our classes in our app will use
//we define enum type here to define our status

enum ProjectStatus {
    Active,
    Finished
}
class Project {

    constructor(public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus      //here we should use literal union type 'active'|'finished' but a good here is to use enum type
    ) {

    }
}


//project state management


//and we have to fix problem to use any[] on our listeners array as type we create custom type here to replace any[]
//we want to encode function type with a one word(Listener)

//and on this we want to add generic type

type Listener<T> = (items: T[]) => void; //w'll equal to function that w'll take items of project as parameter, this void means don't care about type w'll return

//let we create base class for our project state to implement inheritance  that contains listeners and addListener 

class state<T>{
    protected listeners: Listener<T>[]= []; 

    addListener(listenerFn: Listener<T>) {  
        this.listeners.push(listenerFn);





    }






}

class ProjectState extends state<Project> {//<Project>  because is for managing project

    //we wnat to add listener method to manage list of listener  at the end is function which called when some thing changes
//becuse we want to access it in derived class
    private projects: Project[] = [];  //here instead of any[] we use our project type contains all properties project w'll need



    private static instance: ProjectState;

    //private constructor to get garantee of single ton
    private constructor() {
super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new ProjectState();
            return this.instance;
        }
    }

    addListener(listenerFn: Listener<Project>) {   //any here instead of use :Function we use our custom type Listener instead of use any[]

        //we push our listener function 2 our listener array

        this.listeners.push(listenerFn);





    }







    addProject(title: string, description: string, numOfPeople: number) {  //called when we click add project Button


        /* const newProject={
            id:Math.random().toString(),
            title:title,
            description:description,
            people:numOfPeople
        };        instead of above we use our project type*/


        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active  //here we wantb that our project its status will be active by default
        )

        this.projects.push(newProject);
       // this.updateListeners();

        //we gonna call all listeners when sth changes like here to add new project

        for (const listenerFn of this.listeners) {

            //we pass project here and copy this project array with slice take copy of array but not change orginal array
            listenerFn(this.projects.slice())
        }
    }



    moveProject(projectId:string,newStatus:ProjectStatus){ //here is for switch status we have to flip project from active to finished
//here i want to find project with that id in my  projects array then flip its status

const project=this.projects.find(prj=>prj.id===projectId);
if(project && project.status!==newStatus){

    project.status=newStatus;
    this.updateListeners();

}
    }
     private updateListeners(){
        for(const listenerFn of this.listeners){
            listenerFn(this.projects.slice());
        }
    } 
}

//then we create global constant that can be used any where
//const projectState=new ProjectState();  instead of this we create obj with our getInstance static method

const projectState = ProjectState.getInstance();  //this object will be accessed every where in app



//as inheritance we want to add general component class as in angulor that will used on our project and is reusable we give all properties our project will need


//component base class any in this bas class will reused by its derived classes
//here is on user-inserface(UI leavel)
//here we add abstract to not this class be directly instantiated if instantiated ts throw error is for inheritance to be used in derived class
abstract class Component<T extends HTMLElement, U extends HTMLElement>{   //here we avoid to define specific info becouse all not div or all not formelement just say only is htmlElement
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;


    constructor(
        templateId: string,   //we need to know temp id how we select it
        hostElementId: string,
        insertAtStart: boolean,
        newElementId?: string
    ) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;


        const importedNode = document.importNode(this.templateElement.content, true); //to access el we need other property eg elemetnt
        this.element = importedNode.firstElementChild as U; //here we use firstElemChild becouse <section> tag is the first el in our template
        //to excute our attach logic we call attach() private method in this constructor

        //here we need to extra check because newElementId its optional if newElementId is a thing then 

        if (newElementId) {
            this.element.id = newElementId;   //because we not aluays have this we check

        }

        //to call method attach to attach oursection to our div as our DOM
        this.attach(insertAtStart);


    }



    //let use attach here in component

    private attach(insertAtBegining: boolean) {
        this.hostElement.insertAdjacentElement(insertAtBegining ? 'afterbegin' : 'beforeend', this.element); //here we use conditional operator  // afterbegin meansinsert it to beginning of opening tag  //insertAdjacEl is to insert html element &inser adjacent elem first af all description of where we insert it eg if is after or before then content we want to insert as secont argument



    }

    //here we add 2 method w'll be used in derived class configure to render project and renderContent
    //this will enforce derived class to have this methods becouse is abstract
    abstract configure(): void;
    abstract renderContent(): void

}







//class to render single project item

class  ProjectItem extends Component<HTMLUListElement,HTMLLIElement>
implements Draggable{

    private project:Project;
    constructor(hostId:string,project:Project) {
    super('single-project',hostId,false,project.id)
        this.project=project;

        this.configure();
        this.renderContent();

       
        }

        //then we use method of draggable interface as we still forsed by TS to use it

       //these 2 methods does not enable drag and drop it just helps us write Dragonball components or Dragonball  classes in a uniform way.
//here we use outobind decorator to bind



        @autobind
        dragStartHandler(event: DragEvent) {
          event.dataTransfer!.setData('text/plain', this.project.id);
          event.dataTransfer!.effectAllowed = 'move';  //this change control behavior of how cursor should look like and tells litle bit about brouser to be attention  that we plan to move element from A to B
        }


        dragEndHanler(_:DragEvent){

        }

       

        get person(){
            if(this.project.people===1){
                return '1 person ';
            }
            else{
                return this.project.people+' person ';
            }
    }

    //we need this where will required by compone base class
    configure(){
        this.element.addEventListener('dragstart', this.dragStartHandler); //this event will use dragStartHandler;
        this.element.addEventListener('dragend', this.dragEndHanler);  //this event will use dragStartHandler


       
    }
    renderContent(){
        this.element.querySelector('h2')!.textContent=this.project.title;
        this.element.querySelector('h3')!.textContent=this.person+'  assigned';  //here we use getter as optimal way to return person assigned to proj
        this.element.querySelector('p')!.textContent=this.project.description;
        
    }
}

        
//codes to render project list

class ProjectList extends Component<HTMLDivElement, HTMLElement>

implements DragTarget{  //her we can extend component to this class  we passin htmldiv element&htmlelement as parameter T & U


    //we lend some properties from projectInput class
    /* templateElement:HTMLTemplateElement;                        we get rid of this becouse are in base class(component)
        hostElement:HTMLDivElement;                            
        element:HTMLElement;   //we give typ of this here becouse each el above has type of html element  we not say htmlSectionElmt
     */

    assignedProjects: Project[];   //fixedand here any[] type we replace it with Project[] type


    constructor(public type: 'active' | 'finished') {

        //we use super() to call the constructor of the base class
        super('project-list', 'app', false, `${type}-projects`)  //we directly see argument we must pass in as that paramenter of connstructor is in component class


        //we gonna initialise assignedproject in this construct if not this below we see an error

        this.assignedProjects = [];





        //before we attach we call addListerner call whenever changes done



        //this.attach();  we don't call attach again because is called in base class

        //then we render content after we attach out elements to our dom

        this.configure();
        this.renderContent();



    }


   


 @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @autobind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      prjId,
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }







 
    
//renderCotent(){}  //not return something


configure() {

    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    projectState.addListener((projects: Project[]) => {  //and here we use our custom type Project instead opf use any[] here  //projects is like list of our projects


        //we gonna filter or get project depend on its status

        const relevantProject = projects.filter((prj) => {

            if (this.type === 'active') {   //we check for its type
                return prj.status === ProjectStatus.Active;
            }
            return prj.status === ProjectStatus.Finished;
        });

        //then assign filtrated project to assignedProject
        this.assignedProjects = relevantProject;
        this.renderProjects();

        //so now we end to add  project which i get when something changed in my state
    });
}


renderContent() {
    //here we want to assign dynamically id for our unordered list depending on project type if finished or act
    const listId = `${this.type}-projects-list`;
    //we gonna assign our listid to our UL eement
    this.element.querySelector('ul')!.id = listId;



    //we gonna attach text content to our h2 elemengt
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
}







//here we want to render blank spaces or empty elements are in this template






    //we gonna render our project to domm

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;

        //to fix probl of rerender project(or list element(li)) again we set empty string to clear all its content  already been rendered in listEl to clear it to avoid unnecessary rerendering
        listEl.innerHTML = '';  //if not this will rerender all  already rendered contents in Ul again 

        //we want to render all project items of this assingedproject
        for (const prjItems of this.assignedProjects) {

          //  const listItem = document.createElement('li');
  
          // listItem.textContent = prjItems.title;
            
new ProjectItem(this.element.querySelector('ul')!.id,prjItems);
           // listEl.appendChild(listItem);

        }


        


    }



    


}








//we gonna expand input validation with interface

interface validatable {
    value: string | number,
    required?: boolean,
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number        //to add ? is to make this properties option allow for undefined values is like to say min:number |undefined;
}

//use above type interface in this function
function validate(validatableInput: validatable) {
    //we use  isValid as to chech is validation pass or fails
    let isValid = true;

    if (validatableInput.required) {

        isValid = isValid && validatableInput.value.toString().trim().length !== 0;  //here we get err becouse trim&lenght ts not know its type  we use toString() to change to str or for this we use type guard to check

    }

    if (validatableInput.minLength != null &&
        typeof validatableInput.value === 'string') { //!=0 is to prevent minlength of 0 atleast 1   //here we check if minLenth is not set to undefined or zero and if is string as type guard that means if type=number skip this check

        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;


    }

    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string') { //!=0 is to prevent minlength of 0 atleast 1   //here we check if minLenth is not set to undefined or zero and if is string as type guard that means if type=number skip this check

        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;


    }

    if (validatableInput.min != null && typeof validatableInput.value === 'number') { //to make sure validatableInput must not be 0 or nul or undefined and must be type of number if stri skip this check
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }

    if (validatableInput.max != null && typeof validatableInput.value === 'number') {

        isValid = isValid && validatableInput.value <= validatableInput.max
    }
    return isValid;
}

//we gonna add autobind decorator here

function autobind(_: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {

        configurable: true,


        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }


    };

    return adjDescriptor;

}
//first of all we gonna make our html code to be rendered
//we create class to render templete with project-input id and our div id='app'


//and here we can inherit our componet
class ProjectInput extends Component<HTMLDivElement,HTMLFormElement>{

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

//if we instatiate our class into object directly we see our form were in template as hidden content
const prjInput = new ProjectInput();

//we goone instatiate our projectList claa with project type argument

const activepProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');