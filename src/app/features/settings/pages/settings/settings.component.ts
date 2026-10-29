import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { StackApiService } from '@app/core/services/stack-api.service';
import { ManageStacksComponent } from '../../components/manage-stacks/manage-stacks.component';
import { finalize, startWith, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ManageStacksComponent],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  private readonly _stackApiService = inject(StackApiService);

  private refresh$ = new Subject<void>();

  readonly isLoading = signal(true);

  stacks = toSignal(
    this.refresh$.pipe(
      startWith(void 0),
      switchMap(() =>
        this._stackApiService.getStacks().pipe(finalize(() => this.isLoading.set(false))),
      ),
    ),
    { initialValue: { stacks: [] } },
  );

  reloadStacks(): void {
    this.refresh$.next();
  }
}
