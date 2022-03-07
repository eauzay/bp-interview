import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  api:string ="https://pokemon-pichincha.herokuapp.com/pokemons";

  constructor(private http: HttpClient) { }

getAll():Observable<Pokemon[]>{
 return this.http.get<Pokemon[]>(this.api);
}


}
