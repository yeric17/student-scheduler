import { Component, inject, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject/subject.service';
import { SubjectCardComponent } from '../../components/cards/subject-card/subject-card.component';
import { EnrollmentService } from '../../services/enrollment/enrollment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [SubjectCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private subjectService = inject(SubjectService)
  private enrollmentService = inject(EnrollmentService)
  private router = inject(Router)

  subjects = this.subjectService.subjects
  enrollments = this.enrollmentService.enrollments

  ngOnInit(){
      this.subjectService.GetSubjects()
  }
  GoMySubjects(){
      this.subjectService.GetSubjects()
  }
  CancelSubject(){
      this.subjectService.GetSubjects()
  }
}
