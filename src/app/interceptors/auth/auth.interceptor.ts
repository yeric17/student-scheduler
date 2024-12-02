import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  if(!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }
  
  const storageTokenKey = environment.storageTokenKey;
  const tokenObject = localStorage.getItem(storageTokenKey);

  if(tokenObject) {
    const token = JSON.parse(tokenObject);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token.accessToken}`
      }
    });
  }
  return next(req);
};
