import { CanActivateFn, MaybeAsync, GuardResult } from "@angular/router";
import { inject } from "@angular/core";
import { UserTokenStoreService } from "../services/user-token-store.service";
import { UserApiService } from "../services/user-api.service";
import { Router } from "@angular/router";
import { map, catchError, of } from "rxjs";

export const authGuard: CanActivateFn = (route, state): MaybeAsync<GuardResult> => {

  const userTokenStore = inject(UserTokenStoreService)
  const userApi = inject(UserApiService)
  const router = inject(Router)

  const loginRouter = router.createUrlTree(['/login'])
  const HAS_TOKEN = userTokenStore.hasToken()
  if (!HAS_TOKEN) {
    return loginRouter
  }

  return userApi.validateToken().pipe(
    map(() => true),
    catchError(() => {
      userTokenStore.removeToken()
      return of(loginRouter)
    })
  )
}