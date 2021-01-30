   export enum ProjectStatus {
        Active,
        Finished
    }
    export class Project {
    
        constructor(public id: string,
            public title: string,
            public description: string,
            public people: number,
            public status: ProjectStatus      //here we should use literal union type 'active'|'finished' but a good here is to use enum type
        ) {
    
        }
    }





