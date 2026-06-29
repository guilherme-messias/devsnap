import { Component, Input } from '@angular/core';
import { Stack } from '../../core/models/stack.model';

@Component({
  selector: 'app-manage-stacks',
  standalone: true,
  templateUrl: './manage-stacks.component.html',
})
export class ManageStacksComponent {
  @Input() stacks: Stack[] = [];
}
