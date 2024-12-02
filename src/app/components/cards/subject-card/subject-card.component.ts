import { Component, input } from '@angular/core';
import { SubjectResponse } from '../../../services/subject/models/subject.model';

@Component({
  selector: 'app-subject-card',
  imports: [],
  templateUrl: './subject-card.component.html',
  styleUrl: './subject-card.component.scss'
})
export class SubjectCardComponent {
  subject = input.required<SubjectResponse>()
}
