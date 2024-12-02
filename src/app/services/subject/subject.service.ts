import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { SubjectResponse } from './models/subject.model';
import { StandartResponse } from '../../models/response.model';
import { firstValueFrom, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private httpClient = inject(HttpClient);

  private subjectsSignal = signal<SubjectResponse[]>([]);
  private apiUrl = environment.apiUrl;
  public subjects = this.subjectsSignal.asReadonly();

  public async GetSubjects() {
    try {
      let result = await firstValueFrom(this.httpClient.get<StandartResponse<SubjectResponse[]>>(`${this.apiUrl}/subjects`)
        .pipe(
          map((response) => response.value),
        ))
      this.subjectsSignal.set(result);
    } 
    catch {
      this.subjectsSignal.set([]);
    }
  }
}
