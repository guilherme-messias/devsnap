import { Component, inject } from '@angular/core';
import { StackService } from '@app/core/services/stack.service';
import { ManageStacksComponent } from '../../components/manage-stacks/manage-stacks.component';

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
