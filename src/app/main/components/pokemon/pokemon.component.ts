import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  listPokemons: Pokemon[] = [];
  form!: FormGroup;

  constructor(private _pokemonService: PokemonService, private formBuilder: FormBuilder) {
    this.initForm();
   }

  ngOnInit(): void {
    this.getAllPokemon();
  
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', { validators: [Validators.required] }),
      image: new FormControl(''),
      attack: new FormControl(''),
      defense: new FormControl(''),
    })
  }

  getAllPokemon() {
    this._pokemonService.getAll().subscribe(
      response => {
        this.listPokemons = response;
      },
      error => {
        console.log(error);
      }
    )
  }
}
