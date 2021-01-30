

//as inheritance we want to add general component class as in angulor that will used on our project and is reusable we give all properties our project will need


//component base class any in this bas class will reused by its derived classes
//here is on user-inserface(UI leavel)
//here we add abstract to not this class be directly instantiated if instantiated ts throw error is for inheritance to be used in derived class
export default abstract class Component<T extends HTMLElement, U extends HTMLElement>{   //here we avoid to define specific info becouse all not div or all not formelement just say only is htmlElement
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



