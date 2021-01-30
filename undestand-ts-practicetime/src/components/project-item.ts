

//because this class will need extends Component we have to import it in this project-item.ts
//this file will need all this modules to avoid runtime error to loose some modules in app.ts

//EVERY WHERE WE HAVE REFERENCES ,NAMESPACES WE REMOVE IT TO REPLACE TYPESCRIPT IMPORTS WITH ES6 IMPORT&EXPORT


import {Draggable}  from "../models/drag-drop";
import {Project} from "../models/project";
import Cmp from "./base-component";   // here we say Cmp instead of write in full like Component even you import with in abbreviatio no problem becouse defoult export imported in what you want
import {autobind} from '../decorators/autobind';



//class to render single project item

export class  ProjectItem extends Cmp<HTMLUListElement,HTMLLIElement>
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

