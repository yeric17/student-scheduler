import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { SubjectDerailedResponse, SubjectResponse } from './models/subject.model';
import { StandartResponse } from '../../models/response.model';
import { firstValueFrom, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EnrollmentService } from '../enrollment/enrollment.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private httpClient = inject(HttpClient);
  private enrollmentService = inject(EnrollmentService)
  private enrollments = this.enrollmentService.enrollments;

  private subjectsSignal = signal<SubjectResponse[]>([]);
  private apiUrl = environment.apiUrl;
  public subjects = this.subjectsSignal.asReadonly();

  public async GetSubjects() {
    await this.enrollmentService.GetSubscribedSubjects();
    try {
      let result = await firstValueFrom(this.httpClient.get<StandartResponse<SubjectResponse[]>>(`${this.apiUrl}/subjects`)
        .pipe(
          map((response) => {
            let value = response.value;
            let valuesTransformed = value.map((subject) => {
              subject.isEnrolled = this.enrollments().some((enrollment) => enrollment.subjectAssignmentId === subject.subjectAssignmentId);
              return subject;
            })
            return valuesTransformed;
          }),
        ))
      this.subjectsSignal.set(result);
    } 
    catch {
      this.subjectsSignal.set([]);
    }
  }

  public GetSubject(id: string) {
    return this.httpClient.get<StandartResponse<SubjectDerailedResponse>>(`${this.apiUrl}/subjects/${id}`);
  }
}
