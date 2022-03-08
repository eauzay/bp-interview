import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import {
  mockPokemon1,
  mockPokemon2,
  mockPokemonArray,
} from '../test/mocks/pokemon';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../models/pokemon';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpController: HttpTestingController;

  let url = 'https://pokemon-pichincha.herokuapp.com/pokemons';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PokemonService);
    httpController = TestBed.inject(HttpTestingController);
  });


  it('Debe retornar todos los pokemos', () => {
    service.getAll().subscribe((res) => {
      expect(res).toEqual(mockPokemonArray);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/?idAuthor=1`,
    });

    req.flush(mockPokemonArray);
  });


  it('Debe buscar un pokemon por el Id', () => {
    const id = 645;

    service.getById(id).subscribe((data) => {
      expect(data).toEqual(mockPokemon1);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/${id}`,
    });

    req.flush(mockPokemon1);
  });

  it('Debe crear un pokemon', () => {
    service.new(mockPokemon2).subscribe((data) => {
      expect(data).toEqual(mockPokemon2);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}`,
    });

    req.flush(mockPokemon2);
  });

  it('Debe actualizar un pokemon', () => {
    const updatedPokemon: Pokemon = {
      id: 645,
      name: "Pikachu Modificado",
      image: "https://imagenpng.com/wp-content/uploads/2016/09/Pikachu-png-1-635x624.png",
      type: "fire",
      hp: 77,
      attack: 100,
      defense: 100,
      idAuthor: 1,
      created_at: "2022-02-24T16:09:23.247Z",
      updated_at: "2022-03-05T22:55:29.095Z"
    };

    service.update(mockPokemon1.id, mockPokemon1).subscribe((data) => {
      expect(data).toEqual(updatedPokemon);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}/${mockPokemon1.id}`,
    });

    req.flush(updatedPokemon);
  });

  it('Debe eliminar el pokemon', () => {
    service.delete(mockPokemon2.id).subscribe((data) => {
      expect(data).toEqual(mockPokemon2);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${url}/${mockPokemon2.id}`,
    });

    req.flush(mockPokemon2);
  });

})