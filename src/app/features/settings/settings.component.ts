import { Component, inject } from '@angular/core';
import { ManageStacksComponent } from './manage-stacks.component';
import { StackService } from '../../core/services/stack.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ManageStacksComponent],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  private readonly _stackService = inject(StackService);
  readonly stacks = this._stackService.stacks;
}
