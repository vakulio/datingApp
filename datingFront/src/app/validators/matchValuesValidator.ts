import { AbstractControl, ValidatorFn } from "@angular/forms";

export function matchValuesValidator(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => control.value === control.parent?.get(matchTo)?.value ? null : { isMatching: true };
}