import { Component, ComponentRef, inject, viewChildren } from '@angular/core';
import { FieldTextComponent } from '../../components/forms/field-text/field-text.component';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';



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
  userServices = inject(UserService)
  router = inject(Router)

  textFields = viewChildren(FieldTextComponent);

  

  protected email:string = '';
  protected password:string = '';
  
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
        
      }
    });
  }
}
