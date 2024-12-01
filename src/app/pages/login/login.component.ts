import { Component } from '@angular/core';
import { FieldTextComponent } from '../../components/forms/field-text/field-text.component';
import { ButtonComponent } from '../../components/buttons/button/button.component';

@Component({
  selector: 'app-login',
  imports: [
    FieldTextComponent,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
