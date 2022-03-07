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
  viewModalNew: boolean = false;
  viewModalEdit: boolean = false;
  nameSearch: string = "";
  listTemp: Pokemon[] = [];
  titleModal: string = "";


  constructor(private _pokemonService: PokemonService, private formBuilder: FormBuilder) {
    this.initForm();
    this.titleModal  }

  ngOnInit(): void {
    this.getAllPokemon();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
      image: new FormControl(''),
      attack: new FormControl('', { validators: [Validators.required] }),
      defense: new FormControl('', { validators: [Validators.required] }),
      type: new FormControl('normal'),
      hp: new FormControl('', { validators: [Validators.required] }),
      idAuthor: new FormControl(1),
    })
  }

  getAllPokemon() {
    this._pokemonService.getAll().subscribe(
      response => {
        this.listPokemons = response;
        this.listTemp = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  getById(id: number) {
    this._pokemonService.getById(id).subscribe(
      response => {
        this.form.get('id')?.setValue(response.id);
        this.form.get('name')?.setValue(response.name);
        this.form.get('attack')?.setValue(response.attack);
        this.form.get('image')?.setValue(response.image);
        this.form.get('defense')?.setValue(response.defense);
        this.form.get('hp')?.setValue(response.hp);
        this.form.get('type')?.setValue(response.type);
      },
      error => {
        console.log(error);
      }
    )
  }

  newPokemon(pokemon: Pokemon) {
    this._pokemonService.new(pokemon).subscribe(
      response => {
        console.log(response);
        this.getAllPokemon();
      },
      error => {
        console.log(error);
      })
  }

  updatePokemon( pokemon: Pokemon) {
    this._pokemonService.update(pokemon.id, pokemon).subscribe(
      response => {
        console.log(response);
        this.getAllPokemon();
      },
      error => {
        console.log(error);
      })
  }

  clickOnButtonSearch() {
    let textSearch = this.nameSearch.toLowerCase();

    if (textSearch === '') {
      this.getAllPokemon();
    } else {
      this.listPokemons = this.listTemp.filter((element) =>
        element.name.toLowerCase().includes(textSearch) ||
        element.attack.toString().includes(textSearch) ||
        element.defense.toString().includes(textSearch));
    }
  }

  clickOnButtonNew() {
    this.titleModal = "Nuevo Pokemon";
    this.viewModalNew = true;
  }

  onClickSaveButton() {
    const pokemon = this.form.getRawValue();
    if (pokemon.id) {
      this.updatePokemon(pokemon);
    }
    else {
      this.newPokemon(pokemon);
    }
    this.viewModalNew = false;
  }

  onClickButtonDelete(id: number) {
    this._pokemonService.delete(id).subscribe(
      response => {
        console.log(response);
        this.getAllPokemon();
      },
      error => {
        console.log(error);
      })
  }

  onClickCancelButton() {
    this.viewModalNew = false;
    this.form.reset();
  }

  onClickButtonEdit(id: number) {
    this.titleModal = "Editar Pokemon";
    this.viewModalNew = true;
    this.getById(id);
  }
}
