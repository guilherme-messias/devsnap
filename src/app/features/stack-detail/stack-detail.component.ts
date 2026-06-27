import { Component, computed, inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StackService } from '../../core/services/stack.service';
import { Stack } from '../../core/models/stack.model';

@Component({
  selector: 'app-stack-detail',
  standalone: true,
  templateUrl: './stack-detail.component.html',
})
export class StackDetailComponent {
  private readonly _route = inject(ActivatedRoute);
  private readonly _stackService = inject(StackService);

  ngOnInit(): Signal<Stack | undefined> {
    const stackId = this._route.snapshot.paramMap.get('id');
    return computed(() => this._stackService.getById(stackId));
  }
}
