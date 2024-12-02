import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../services/notifications/notification.service';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';

@Component({
  selector: 'app-notification-manager',
  imports: [NotificationModalComponent],
  templateUrl: './notification-manager.component.html',
  styleUrl: './notification-manager.component.scss'
})
export class NotificationManagerComponent {
  notifications = inject(NotificationService).notifications
}
