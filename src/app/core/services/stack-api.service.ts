import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { StackListResponse } from '../models/stack-list-response.model';
import { Stack } from '../models/stack.model';
import { StackDetailResponse } from '../models/stack-detail-response.model';

@Injectable({ providedIn: 'root' })
export class StackApiService {
  private readonly apiUrl = environment.apiUrl;
  private readonly _httpClient = inject(HttpClient);

  getStacks() {
    return this._httpClient.get<StackListResponse>(`${this.apiUrl}/stacks`);
  }

  getStackById(stackId: string) {
    return this._httpClient.get<StackDetailResponse>(`${this.apiUrl}/stacks/${stackId}`);
  }

  createStack(stackName: string) {
    const stackData = {
      name: stackName,
    };

    return this._httpClient.post<Stack>(`${this.apiUrl}/stacks`, stackData);
  }

  updateStack(stackId: string, stackName: string) {
    const stackData = {
      name: stackName,
    };
    return this._httpClient.patch<Stack>(`${this.apiUrl}/stacks/${stackId}`, stackData);
  }

  deleteStack(stackId: string) {
    return this._httpClient.delete(`${this.apiUrl}/stacks/${stackId}`);
  }
}
