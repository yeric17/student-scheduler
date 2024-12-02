import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorLabelComponent } from '../error-label/error-label.component';

@Component({
  selector: 'app-field-text',
  imports: [FormsModule, ErrorLabelComponent],
  templateUrl: './field-text.component.html',
  styleUrl: './field-text.component.scss'
})
export class FieldTextComponent {
  type = input<'text'|'password'|'email'>('text');
  placeholder = input<string>('');
  value = model<string>('');
  required = input<boolean>(true);
  disabled = input<boolean>(false);

  protected isValid = true;
  protected errorMessage:string = '';
 

  public Validate(){
    this.isValid = true;
    this.errorMessage = '';
    if(this.required() && this.value() === ''){
      this.isValid = false;
      this.errorMessage = 'Este campo es requerido';
    }
    return this.isValid;
  }
}
