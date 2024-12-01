import { Component } from '@angular/core';
import { FieldTextComponent } from '../../components/forms/field-text/field-text.component';
import { ButtonComponent } from '../../components/buttons/button/button.component';

@Component({
  selector: 'app-register',
  imports: [FieldTextComponent,ButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
