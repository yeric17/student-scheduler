import { Component, inject, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject/subject.service';
import { SubjectCardComponent } from '../../components/cards/subject-card/subject-card.component';

@Component({
  selector: 'app-home',
  imports: [SubjectCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  subjectService = inject(SubjectService)

  subjects = this.subjectService.subjects

  ngOnInit(): void {
      this.subjectService.GetSubjects()
  }
}
