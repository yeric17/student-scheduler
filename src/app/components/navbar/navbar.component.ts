import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppLogoComponent } from '../logos/app-logo/app-logo.component';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,AppLogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  protected isActiveMenu = false;
  private userService = inject(UserService)
  private router = inject(Router)

  CloseMenu(){
    this.isActiveMenu = false;
  }

  OpenMenu(){
    this.isActiveMenu = true;
  }

  Logout(){
    this.userService.Logout();
    this.router.navigate(['login']);
  }
}
