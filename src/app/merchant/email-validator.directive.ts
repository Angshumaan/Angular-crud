import { Directive } from '@angular/core';
import {
  Validator,
  NG_VALIDATORS,
  ValidatorFn,
  FormControl,
} from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  validator: ValidatorFn;
  constructor() {
    this.validator = this.emailValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  emailValidator(): ValidatorFn {
    return (control: FormControl) => {
      if (control.value != null && control.value !== '') {
        let isValid =
          /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(
            control.value
          );
        if (isValid) {
          return null;
        } else {
          return {
            emailvalidator: { valid: false },
          };
        }
      } else {
        return null;
      }
    };
  }
}
