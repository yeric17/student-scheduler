import { Component, inject, input, OnInit, signal } from '@angular/core';
import { SubjectService } from '../../services/subject/subject.service';
import { SubjectDerailedResponse, SubjectResponse } from '../../services/subject/models/subject.model';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { EnrollmentService } from '../../services/enrollment/enrollment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject',
  imports: [ButtonComponent],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent implements OnInit {

  id = input<string>()

  subjectService = inject(SubjectService)
  enrollmentService = inject(EnrollmentService)
  router = inject(Router)

  subject:SubjectDerailedResponse|undefined = undefined



  ngOnInit(): void {
      this.GetSubject()
  }

  GetSubject(){
    const currentId = this.id()
    if(currentId === undefined) return;
    this.subjectService.GetSubject(currentId)
    .subscribe({
      next: (response) => {
        this.subject = response.value
        console.log(this.subject)
      }
    })
  }

  Cancelar(){
    if(this.subject === undefined) return;
    this.enrollmentService.Cancel(this.subject.subjectAssignmentId)
    .subscribe({
      next: () => {
        this.router.navigate(['/app'])
      }
    })
  }
}
