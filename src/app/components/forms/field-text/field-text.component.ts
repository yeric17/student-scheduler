import { Component, input } from '@angular/core';

@Component({
  selector: 'app-field-text',
  imports: [],
  templateUrl: './field-text.component.html',
  styleUrl: './field-text.component.scss'
})
export class FieldTextComponent {
  type = input<'text'|'password'>('text');
  placeholder = input<string>('');
}
