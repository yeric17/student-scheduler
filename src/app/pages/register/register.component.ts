import { Component, inject, viewChildren } from '@angular/core';
import { FieldTextComponent } from '../../components/forms/field-text/field-text.component';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { ErrorLabelComponent } from '../../components/forms/error-label/error-label.component';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FieldTextComponent,ButtonComponent,ErrorLabelComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private userServices = inject(UserService)
  private router = inject(Router)

  protected email:string = '';
  protected password:string = '';
  protected firstName:string = '';
  protected lastName:string = '';
  protected errorMessage:string = '';

  textFields = viewChildren(FieldTextComponent);

  Register(event:Event){
    event.preventDefault()
    let isValid = true;
    this.textFields().forEach((field) => {
      if(!field.Validate()) isValid = false;
    });

    if(!isValid) return;

    this.errorMessage = '';
    this.userServices.Register(this.email, this.password, this.firstName, this.lastName)
    .subscribe({
      next: (response) => {
        this.router.navigate(['app'])
      },
      error: (result) => {

        let errors = result.error.errors;
        if(errors !== undefined){
          let errorsArray = Object.keys(errors).map((key) => errors[key]);
          
          this.errorMessage = errorsArray.join('\n');
          return;
        }
        this.errorMessage = 'An error occurred';
      }
    });
  }
}
