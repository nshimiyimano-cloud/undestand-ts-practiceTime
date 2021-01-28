namespace App{


//we gonna add autobind decorator here

export function autobind(_: any, methodName: string, descriptor: PropertyDescriptor) {
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


}