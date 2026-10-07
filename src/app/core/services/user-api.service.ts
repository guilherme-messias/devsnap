import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserTokenSuccessAuthResponse } from "../models/user-token-success-auth-response.model";

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private readonly apiUrl = 'https://devsnap-api.onrender.com'
  private readonly _httpClient = inject(HttpClient);

  validateToken() {
    return this._httpClient.get<UserTokenSuccessAuthResponse>(`${this.apiUrl}/users/me`);
  }
}