import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-base-layout',
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss'
})
export class BaseLayoutComponent {
  protected userService = inject(UserService)

  protected user = this.userService.user;
}
