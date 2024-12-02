import { Component, input } from '@angular/core';
import { NotificationModel } from '../../../services/notifications/models/notification.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-modal',
  imports: [CommonModule],
  templateUrl: './notification-modal.component.html',
  styleUrl: './notification-modal.component.scss'
})
export class NotificationModalComponent {
  notificationModel = input<NotificationModel>()
}
