import { CanActivateFn, MaybeAsync, GuardResult } from "@angular/router";
import { inject } from "@angular/core";
import { UserTokenStoreService } from "../services/user-token-store.service";
import { Router } from "@angular/router";

export const guestGuard: CanActivateFn = (route, state): MaybeAsync<GuardResult> => {
  const userTokenStore = inject(UserTokenStoreService)
  const router = inject(Router)

  const HAS_TOKEN = userTokenStore.hasToken()
  if (HAS_TOKEN) {
    return true
  }
  
  return router.createUrlTree(['/'])
}