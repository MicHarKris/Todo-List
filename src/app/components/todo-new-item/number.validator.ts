import { AbstractControl, ValidatorFn } from '@angular/forms';

// Custom validator function to check if the value is a number
export function numberValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const value = control.value;
  if (value && isNaN(value)) {
    return { notNumber: true }; // Return an error if the value is not a number
  }
  return null; // Return null if the value is a number or empty
}
