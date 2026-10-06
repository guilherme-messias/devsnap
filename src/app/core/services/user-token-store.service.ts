import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UserTokenStoreService {
  private readonly tokenKey = 'auth-token';

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }
}