import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const authGuard = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const isAuthenticated = () => {
    if (!isPlatformBrowser(platformId)) {
      return false;
    }
    const raw = localStorage.getItem('devsnap:stacks');
    return raw ? JSON.parse(raw).length > 0 : false;
  };

  if (isAuthenticated()) {
    return true;
  }

  return router.parseUrl('/onboarding');
};

export const onboardingGuard = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const isOnboarded = () => {
    if (!isPlatformBrowser(platformId)) {
      return false;
    }
    const raw = localStorage.getItem('devsnap:stacks');
    return raw ? JSON.parse(raw).length > 0 : false;
  };

  if (!isOnboarded()) {
    return true;
  }

  return router.parseUrl('/home');
};
