
import {Project,ProjectStatus} from "../models/project";



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

//we not export above because all above was used in below exported class projectState

export class ProjectState extends state<Project> {//<Project>  because is for managing project

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



console.log("Running......");
 export  const projectState = ProjectState.getInstance();  //this object will be accessed every where in app


