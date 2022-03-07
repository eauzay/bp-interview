import { Injectable } from "@angular/core";
import { Pokemon } from '../../models/pokemon';

@Injectable()
export class PokemonService {
  listPokemons: Pokemon[] = [];

  getAll(): Pokemon[] {
    return this.listPokemons;
  }

  new(pokemon: Pokemon): void {
    this.listPokemons = [...this.listPokemons, pokemon];
  }

  delete(id: number): void {
    this.listPokemons = this.listPokemons.filter(x => x.id !== id);
  }

  update(id: number, pokemon: Pokemon): void {
    this.listPokemons = this.listPokemons.map(x => {
      if (x.id === id) {
        return pokemon;
      }
      return x;
    })
  }
}

describe("People Service", () => {
  let pokemonService: PokemonService;

  beforeEach(() => {
    pokemonService = new PokemonService();
  })

  describe("init", () => {
    it("should defined", () => {
      expect(pokemonService).toBeDefined();
    });

    it("should create pokemon service with empty pokemon list", () => {
      expect(pokemonService.listPokemons).toEqual([]);
    });

  })

  describe("getAll method", () => {
    it("should get pokemons", () => {
      expect(pokemonService.getAll()).toEqual([]);
    })
  })

  describe("new method", () => {
    const pokemonMock: Pokemon = { id: 645, name: "Pikachu", image: "https://imagenpng.com/wp-content/uploads/2016/09/Pikachu-png-1-635x624.png", type: "fire", hp: 77, attack: 100, defense: 100, idAuthor: 1, created_at: "2022-02-24T16:09:23.247Z", updated_at: "2022-03-05T22:55:29.095Z" }
    it("should get pokemons", () => {
      pokemonService.new(pokemonMock);
      expect(pokemonService.getAll()).toEqual([pokemonMock]);
    })
  })

  describe("update method", () => {
    it("should update pokemon", () => {
      const pokemonMock: Pokemon = { id: 645, name: "Pikachu", image: "https://imagenpng.com/wp-content/uploads/2016/09/Pikachu-png-1-635x624.png", type: "fire", hp: 77, attack: 100, defense: 100, idAuthor: 1, created_at: "2022-02-24T16:09:23.247Z", updated_at: "2022-03-05T22:55:29.095Z" }
      const pokemonUpdateMock: Pokemon = { id: 645, name: "Pikachu Modificado", image: "https://imagenpng.com/wp-content/uploads/2016/09/Pikachu-png-1-635x624.png", type: "fire", hp: 77, attack: 100, defense: 100, idAuthor: 1, created_at: "2022-02-24T16:09:23.247Z", updated_at: "2022-03-05T22:55:29.095Z" }
      const expectResult = [{ id: 645, name: "Pikachu Modificado", image: "https://imagenpng.com/wp-content/uploads/2016/09/Pikachu-png-1-635x624.png", type: "fire", hp: 77, attack: 100, defense: 100, idAuthor: 1, created_at: "2022-02-24T16:09:23.247Z", updated_at: "2022-03-05T22:55:29.095Z" }];

      pokemonService.new(pokemonMock);
      pokemonService.update(645, pokemonUpdateMock);

      expect(pokemonService.getAll()).toEqual(expectResult);
    });

  })

  describe("delete method", () => {
    it("should get pokemons", () => {
      const pokemonMock: Pokemon = { id: 645, name: "Pikachu", image: "https://imagenpng.com/wp-content/uploads/2016/09/Pikachu-png-1-635x624.png", type: "fire", hp: 77, attack: 100, defense: 100, idAuthor: 1, created_at: "2022-02-24T16:09:23.247Z", updated_at: "2022-03-05T22:55:29.095Z" }
      pokemonService.new(pokemonMock);
      expect(pokemonService.getAll()).toEqual([pokemonMock]);

      pokemonService.delete(pokemonMock.id);
      expect(pokemonService.getAll()).toEqual([]);

    })
  })
})