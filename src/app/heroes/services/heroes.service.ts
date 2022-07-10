import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]> {
    //devuelve un observable
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`)
  }
  getHeroeById(id: string): Observable<Heroe> {

    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`)
  }
  getSugestions(search: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${search}&_limit=5`)
  }

}
