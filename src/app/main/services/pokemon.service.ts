import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  api: string = "https://pokemon-pichincha.herokuapp.com/pokemons";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.api+"/"+'?idAuthor=1');
  }

  getById(id: number) {
    return this.http.get<Pokemon>(`${this.api}/${id}`)
  }

  new(param: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.api, param);
  }

  update(id: number, param: Pokemon): Observable<Pokemon> {
    return this.http.put<Pokemon>(`${this.api}/${id}`, param);
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete<unknown>(`${this.api}/${id}`);
  }
}
