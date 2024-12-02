import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)
  

  let isAuthenticated = await userService.IsAuthenticated();

  if(!isAuthenticated){
    await firstValueFrom(userService.RefreshToken())  
    isAuthenticated = await userService.IsAuthenticated();
    if(!isAuthenticated) {
      router.navigate(['login'])
      return false;
    }
  }
  return true;
};
