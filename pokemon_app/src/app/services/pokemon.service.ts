import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private _http: HttpClient) {}

  getPokemonList(): Observable<any> {
    return this._http.get("https://pokeapi.co/api/v2/pokemon?limit=20");
  }

  getPokemonDetails(url: string): Observable<any> {
    return this._http.get(url);
  }
}
