import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../models/pokemon';

describe('PokemonService', () => {

 // let service: PokemonService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController) 
  });

  it('should be created', () => {
    const service: PokemonService = TestBed.get(PokemonService);
    expect(service).toBeTruthy();
  });

  it('shoud return Observable<Pokemon[]>', () => {
    const service: PokemonService = TestBed.get(PokemonService);
    let mockPokemon: Pokemon[] = [{
      "id": 687,
      "name": "XXX",
      "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
      "type": "normal",
      "hp": 82,
      "attack": 100,
      "defense": 94,
      "idAuthor": 1,
      "created_at": "2022-03-05T23:48:59.623Z",
      "updated_at": "2022-03-05T23:49:57.481Z"
    },
    {
      "id": 668,
      "name": "LUCARIO editado",
      "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/448_f2.png",
      "type": "poison",
      "hp": 34,
      "attack": 40,
      "defense": 77,
      "idAuthor": 1,
      "created_at": "2022-02-28T15:56:24.375Z",
      "updated_at": "2022-03-06T03:38:48.230Z"
    },
    ];

    service.getAll().subscribe((pokemons) =>{
      expect(pokemons.length).toBe(2);
      expect(pokemons).toEqual(mockPokemon);
      expect(pokemons[0].name).toBeDefined();
    })

    const req= httpMock.expectOne('https://pokemon-pichincha.herokuapp.com/pokemons');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);



  })
});
