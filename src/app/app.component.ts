import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationManagerComponent } from './components/notifications/notification-manager/notification-manager.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NotificationManagerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'student-scheduler';
}
