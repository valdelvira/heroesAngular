import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Auth } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl
  private _auth: Auth | undefined
  constructor(private http: HttpClient) { }

  get auth(): Auth {
    return { ...this._auth! }
  }

  verifyAuth(): Observable<boolean> {
    if (!localStorage.getItem('id')) {
      return of(false)
    }
    //return true
    // se puede resolver el observable en un boolean con of
    //return of(true)
    // vuelvo a hacer la consulta
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      //como espera un bool lo paso por un pipe
      .pipe(
        //modifica la respuesta y devuelvo un boolean
        map(auth => {
          this._auth = auth
          return true

        })
      )
  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        //se ejecuta antes que cualquier subscribe
        tap(auth => this._auth = auth),
        tap(auth => localStorage.setItem('id', auth.id))
      )
  }
  logout() {
    this._auth = undefined;
  }

}
