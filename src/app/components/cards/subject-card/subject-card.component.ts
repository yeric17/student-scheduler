import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { SubjectResponse } from '../../../services/subject/models/subject.model';
import { ButtonComponent } from "../../buttons/button/button.component";
import { EnrollmentService } from '../../../services/enrollment/enrollment.service';
import { firstValueFrom } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../../services/notifications/notification.service';

@Component({
  selector: 'app-subject-card',
  imports: [ButtonComponent,RouterLink],
  templateUrl: './subject-card.component.html',
  styleUrl: './subject-card.component.scss'
})
export class SubjectCardComponent {
  private enrollmentService = inject(EnrollmentService)
  private notificationService = inject(NotificationService)

  @Output() OnEnroll = new EventEmitter()
  @Output() OnCancel = new EventEmitter()

  subject = input.required<SubjectResponse>()

  Enroll(){

    this.enrollmentService.Enroll(this.subject().subjectAssignmentId)
    .subscribe({
      next: () => {
        this.OnEnroll.emit()
      },
      error: (result) => {
        const error = result.error
        if(error.message){
          this.notificationService.Error(error.message)
        }
        else{
          this.notificationService.Error("An error occurred while trying to enroll in the subject.")
        }
      }
    })
  }

  Cancel(){
    this.enrollmentService.Cancel(this.subject().subjectAssignmentId)
    .subscribe({
      next: () => {
        this.OnCancel.emit()
      }
    })
  }
}
