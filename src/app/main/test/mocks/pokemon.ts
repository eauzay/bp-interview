import { Pokemon } from '../../models/pokemon';

const mockPokemon1: Pokemon = {
    id: 645,
    name: "Pikachu",
    image: "https://imagenpng.com/wp-content/uploads/2016/09/Pikachu-png-1-635x624.png",
    type: "fire",
    hp: 77,
    attack: 100,
    defense: 100,
    idAuthor: 1,
    created_at: "2022-02-24T16:09:23.247Z",
    updated_at: "2022-03-05T22:55:29.095Z"
}

const mockPokemon2: Pokemon = {
    id: 668,
    name: "LUCARIO",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/448_f2.png",
    type: "poison",
    hp: 34,
    attack: 8,
    defense: 77,
    idAuthor: 1,
    created_at: "2022-02-28T15:56:24.375Z",
    updated_at: "2022-03-07T07:58:19.282Z"
};

const mockPokemonArray: Pokemon[] = [mockPokemon1, mockPokemon2];

export { mockPokemon1, mockPokemon2, mockPokemonArray };