
    //we gonna expand input validation with interface

export interface validatable {
    value: string | number,
    required?: boolean,
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number        //to add ? is to make this properties option allow for undefined values is like to say min:number |undefined;
}

//use above type interface in this function
export function validate(validatableInput: validatable) {
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

