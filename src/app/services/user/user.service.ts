import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TokenResponse } from './models/token.model';
import { catchError, firstValueFrom, of, switchMap, tap, throwError } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpClient = inject(HttpClient);

  private apiUrl = environment.apiUrl;
  private STORAGE_TOKEN_KEY = environment.storageTokenKey;

  private userSignal = signal<User | null>(null);

  public user = this.userSignal.asReadonly()

  public Login(email: string, password: string) {
    return this.httpClient.post<TokenResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.STORAGE_TOKEN_KEY, JSON.stringify(response));
        }),
        switchMap(() => this.GetMe())
      )
  }

  public async IsAuthenticated() {
    const me = await firstValueFrom(this.GetMe().pipe(catchError(() => of(null))));
    return me !== null;
  }

  public GetMe() {
    return this.httpClient.get<User>(`${this.apiUrl}/account/me`)
    .pipe(
      tap((user) => {
        this.userSignal.set(user);
      })
    )
  }

  public RefreshToken() {
    const tokenObject = localStorage.getItem(this.STORAGE_TOKEN_KEY);

    if(!tokenObject) {
      return of(null);
    }

    const { refreshToken } = JSON.parse(tokenObject);

    return this.httpClient.post<TokenResponse>(`${this.apiUrl}/refresh`, { refreshToken })
      .pipe(
        tap((response) => {
          localStorage.setItem(this.STORAGE_TOKEN_KEY, JSON.stringify(response));
        }),
        switchMap(() => this.GetMe())
      )
  }

  public Logout() {
    localStorage.removeItem(this.STORAGE_TOKEN_KEY);
    this.userSignal.set(null);
  }
}
