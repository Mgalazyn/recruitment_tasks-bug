import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [NgIf, NgFor, TitleCasePipe, RouterModule],
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'] 
})
export class PokemonComponent implements OnInit {
  pokemonsUrl: string[] = [];
  pokemonsName: string[] = [];
  selectedPokemon: any = null;
  showDetailsIndex =-1;

  pokemonStats: any[] = [];
  visable: boolean = false;

  getPokemons(){
    this.pokemonsUrl = [];
    this.pokemonsName = []
    return axios.get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0").then((response: any) =>{
      response.data.results.forEach((pokemon: any) => {
        this.pokemonsUrl.push(pokemon.url);
        this.pokemonsName.push(pokemon.name);
      });
    })
  }

  async ngOnInit(){

    await this.getPokemons();
    this.pokemonStats = [];
    for (let i = 1; i < this.pokemonsUrl.length; i++) {
      await axios.get(this.pokemonsUrl[i]).then((response: any)=>{
        this.pokemonStats.push(response.data);
      });
    }
  }

  onClick(index: number) {
    this.showDetailsIndex = (this.showDetailsIndex === index) ? -1 : index;
  }
}
