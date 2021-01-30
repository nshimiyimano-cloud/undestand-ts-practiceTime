
//because this class will need extends Component we have to import it in this project-item.ts
import { DragTarget } from "../models/drag-drop";
import { Project, ProjectStatus } from '../models/project';
import Component from "./base-component";
import {projectState} from "../state/project-state";
import {autobind} from "../decorators/autobind"
import {ProjectItem} from "./project-item";       //we remove this extension becouse weebpoack directly see /know is js here







//codes to render project list

export class ProjectList extends Component<HTMLDivElement, HTMLElement>

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


 


