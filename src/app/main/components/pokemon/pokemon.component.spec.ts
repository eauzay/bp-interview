import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonComponent } from './pokemon.component';
import { of } from 'rxjs';
import { FormBuilder, FormsModule } from '@angular/forms';

describe('PokemonComponent', () => {
  let fixture: ComponentFixture<PokemonComponent>;
  let component: PokemonComponent;
  let pokemonSpy: jasmine.SpyObj<PokemonService>;

  beforeEach(waitForAsync(() => {
    pokemonSpy = jasmine.createSpyObj<PokemonService>('PokemonService', ['getAll'])

    TestBed.configureTestingModule({
      declarations: [PokemonComponent],
      providers: [
        { provide: PokemonService, useValue: pokemonSpy },
        { provide: FormBuilder }
      ],
      imports: [FormsModule]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('El metodo getAll debe inicializar el atributo listPokemons', () => {
    pokemonSpy.getAll.and.returnValue(of([
      { id: 645, name: "Pikachu", image: "https://imagenpng.com/wp-content/uploads/2016/09/Pikachu-png-1-635x624.png", type: "fire", hp: 77, attack: 100, defense: 100, idAuthor: 1, created_at: "2022-02-24T16:09:23.247Z", updated_at: "2022-03-05T22:55:29.095Z" },
      { id: 668, name: "LUCARIO", image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/448_f2.png", type: "poison", hp: 34, attack: 8, defense: 77, idAuthor: 1, created_at: "2022-02-28T15:56:24.375Z", updated_at: "2022-03-07T07:58:19.282Z" }
    ]));

    component.getAll();
    expect(component.listPokemons.length).toBe(2)
  })

  it('El metodo crear debe crear un pokemon', () => {
    const newPokemon = { id: 645, name: "Pikachu", image: "https://imagenpng.com/wp-content/uploads/2016/09/Pikachu-png-1-635x624.png", type: "fire", hp: 77, attack: 100, defense: 100, idAuthor: 1, created_at: "2022-02-24T16:09:23.247Z", updated_at: "2022-03-05T22:55:29.095Z" }
    pokemonSpy.new.and.returnValue(of(newPokemon));
    component.new(newPokemon)
    expect(component.listPokemons.length).toBe(1);
  })

  it('El metodo update debe actualizar un pokemon', () => {
    const newPokemon = { id: 645, name: "Pikachu", image: "https://imagenpng.com/wp-content/uploads/2016/09/Pikachu-png-1-635x624.png", type: "fire", hp: 77, attack: 100, defense: 100, idAuthor: 1, created_at: "2022-02-24T16:09:23.247Z", updated_at: "2022-03-05T22:55:29.095Z" }
    pokemonSpy.new.and.returnValue(of(newPokemon));
    component.new(newPokemon)
    expect(component.listPokemons.length).toBe(1);

    newPokemon.name ="Pikachu actualizado";
    pokemonSpy.update.and.returnValue(of(newPokemon));
    component.update(newPokemon);

    expect(component.listPokemons.length).toBe(1);
    expect(component.listPokemons[0].name).toBe(newPokemon.name);
  })

  it('El metodo delete debe eliminar un pokemon', () => {
    const newPokemon = { id: 645, name: "Pikachu", image: "https://imagenpng.com/wp-content/uploads/2016/09/Pikachu-png-1-635x624.png", type: "fire", hp: 77, attack: 100, defense: 100, idAuthor: 1, created_at: "2022-02-24T16:09:23.247Z", updated_at: "2022-03-05T22:55:29.095Z" }
    pokemonSpy.new.and.returnValue(of(newPokemon));
    component.new(newPokemon)

    expect(component.listPokemons.length).toBe(1);

    pokemonSpy.delete.and.returnValue(of({}))
    component.delete(newPokemon.id);

    expect(component.listPokemons.length).toBe(0);
  })
})





