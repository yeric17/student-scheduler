import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Enrollment } from './models/enrollment.model';
import { firstValueFrom, map, of } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private httpClient = inject(HttpClient)
  private userService = inject(UserService)
  private apiUrl = environment.apiUrl

  private enrollmentsSignal = signal<Enrollment[]>([])
  public enrollments = this.enrollmentsSignal.asReadonly()

  async GetSubscribedSubjects() {
    try {
      let result = await firstValueFrom(this.httpClient.get<Enrollment[]>(`${this.apiUrl}/enrollments`))
      this.enrollmentsSignal.set(result)
    }
    catch {
      this.enrollmentsSignal.set([])
    }
  }

  public Enroll(subjectAssignmentId: string) {
    let studentId = this.userService.user()?.userId


    return this.httpClient.post(`${this.apiUrl}/enrollments`, { subjectAssignmentId, studentId })  
  }

  public Cancel(subjectAssignmentId: string) {
    return this.httpClient.delete(`${this.apiUrl}/enrollments/${subjectAssignmentId}`)
  }

  public GetMyEnrollments() {
    return this.httpClient.get<Enrollment[]>(`${this.apiUrl}/enrollments`)
  }
}
