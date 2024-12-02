import { Component, ComponentRef, inject, viewChildren } from '@angular/core';
import { FieldTextComponent } from '../../components/forms/field-text/field-text.component';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ErrorLabelComponent } from '../../components/forms/error-label/error-label.component';



@Component({
  selector: 'app-login',
  imports: [
    FieldTextComponent,
    ButtonComponent,
    ErrorLabelComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userServices = inject(UserService)
  router = inject(Router)

  textFields = viewChildren(FieldTextComponent);

  

  protected email:string = '';
  protected password:string = '';

  protected errorMessage:string = '';
  
  Login(event:Event){
    event.preventDefault()
    let isValid = true;
    this.textFields().forEach((field) => {
      if(!field.Validate()) isValid = false;
    });

    if(!isValid) return;

    this.userServices.Login(this.email, this.password)
    .subscribe({
      next: (response) => {
        this.router.navigate([''])
      },
      error: (error) => {
        if(error.status === 401) this.errorMessage = 'Usuario o contraseña incorrectos';
        else this.errorMessage = 'An error occurred';
      }
    });
  }
}
