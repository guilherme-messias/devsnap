import { HttpInterceptorFn } from "@angular/common/http";
import { UserTokenStoreService } from "../services/user-token-store.service";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const userTokenStore = inject(UserTokenStoreService);

  const HAS_TOKEN = userTokenStore.hasToken();

  if (HAS_TOKEN) {
    const newRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${userTokenStore.getToken()}`,
      },
    });
    return next(newRequest);
  }

  return next(request);
};