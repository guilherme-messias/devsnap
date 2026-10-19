import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { StackResponse } from "../models/stack-response.model";
import { Stack } from "../models/stack.model";

@Injectable({ providedIn: 'root' })
export class StackApiService {
  private readonly apiUrl = environment.apiUrl
  private readonly _httpClient = inject(HttpClient);

  getStacks() {
    return this._httpClient.get<StackResponse>(`${this.apiUrl}/stacks`);
  }

  createStack(stackName: string) {
    const stackData = {
      name: stackName,
    };

    return this._httpClient.post<Stack>(`${this.apiUrl}/stacks`, stackData);
  }
}