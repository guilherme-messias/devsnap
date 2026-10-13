import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserTokenSuccessAuthResponse } from "../models/user-token-success-auth-response.model";
import { UserLoginSuccessResponse } from "../models/user-login-success-response.model";
import { map, tap } from "rxjs";
import { UserTokenStoreService } from "./user-token-store.service";
import { UserRegisterSuccessResponse } from "../models/user-register-success-response.model";

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

  register(name: string, email: string, password: string, role: string) {
    return this._httpClient.post<UserRegisterSuccessResponse>(`${this.apiUrl}/auth/register`, { name, email, password, role })
  }
}