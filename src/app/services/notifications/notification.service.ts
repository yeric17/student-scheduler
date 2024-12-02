import { Injectable, signal } from '@angular/core';
import { NotificationModel } from './models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSignal = signal<NotificationModel[]>([]);

  public notifications = this.notificationsSignal.asReadonly();

  public AddNotification(notification: NotificationModel) {
    this.notificationsSignal.update((notifications) => [...notifications, notification]);

    setTimeout(() => {
      this.RemoveNotification(notification);
    }, 5000);
  }

  public RemoveNotification(notification: NotificationModel) {
    this.notificationsSignal.update((notifications) => notifications.filter((n) => n !== notification));
  }
  
  public Success(message: string) {
    this.AddNotification({ message, type: 'success' });
  }

  public Error(message: string) {
    this.AddNotification({ message, type: 'error' });
  }

  public Warning(message: string) {
    this.AddNotification({ message, type: 'warning' });
  }
}
