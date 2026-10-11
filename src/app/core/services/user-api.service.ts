import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserTokenSuccessAuthResponse } from "../models/user-token-success-auth-response.model";
import { UserLoginSuccessResponse } from "../models/user-login-success-response.model";
import { tap } from "rxjs";
import { UserTokenStoreService } from "./user-token-store.service";

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private readonly apiUrl = 'https://devsnap-api.onrender.com'
  private readonly _httpClient = inject(HttpClient);
  private readonly _UserTokenStore = inject(UserTokenStoreService);

  validateToken() {
    return this._httpClient.get<UserTokenSuccessAuthResponse>(`${this.apiUrl}/users/me`);
  }

  login(email: string, password: string) {
    return this._httpClient.post<UserLoginSuccessResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap((response) => {
       this._UserTokenStore.setToken(response.accessToken);
      })
    );
  }
}