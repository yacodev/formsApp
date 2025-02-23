import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils.';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPageComponent {
  // myForm = new FormGroup({
  //   name: new FormControl<string>(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    //nameField: [initialValue, /** validadores sincronos */, /** validadores asincronos */],
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
      ] /** validadores asincronos */,
    ],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  onSave() {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset();
  }
}
