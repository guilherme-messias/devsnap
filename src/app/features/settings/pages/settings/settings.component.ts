import { Component, inject, signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { StackApiService } from '@app/core/services/stack-api.service';
import { ManageStacksComponent } from '../../components/manage-stacks/manage-stacks.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ManageStacksComponent],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  private readonly _stackApiService = inject(StackApiService);

  readonly isLoading = signal(true);

  readonly stacks = toSignal(
    this._stackApiService.getStacks().pipe(finalize(() => this.isLoading.set(false))),
    { initialValue: { stacks: [] } },
  );
}
