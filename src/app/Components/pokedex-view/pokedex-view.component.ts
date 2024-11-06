import { Component } from '@angular/core';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { GraficoComponent } from '../grafico/grafico.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokedex-view',
  standalone: true,
  imports: [CommonModule, PokedexComponent, GraficoComponent],
  templateUrl: './pokedex-view.component.html',
  styleUrls: ['./pokedex-view.component.css']
})
export class PokedexViewComponent {
  pokemonId: number = 1;
  pokemonImagen: string = '';
  pokemonData: any = {};
  pokemonImagenShiny: string = '';
  pokemonImagenMega: string = '';

  constructor() {
    this.obtenerDatosPokemon(this.pokemonId);
  }

  changePokemon(cambio: number): void {
    this.pokemonId += cambio;
    if (this.pokemonId < 1) this.pokemonId = 1;
    if (this.pokemonId > 898) this.pokemonId = 898;
    this.obtenerDatosPokemon(this.pokemonId);
  }
  
  searchPokemonById(id: number): void {
    if (id >= 1 && id <= 898) {
      this.pokemonId = id;
      this.obtenerDatosPokemon(this.pokemonId);
    }
  }

  private obtenerDatosPokemon(id: number): void {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Imagen normal
        this.pokemonImagen = data.sprites.front_default;
        // Imagen shiny
        this.pokemonImagenShiny = data.sprites.front_shiny;
        // Intentar obtener mega evolución (si existe)
        this.pokemonImagenMega = data.sprites.other['official-artwork'].front_default;
        
        this.pokemonData = {
          id: `#${data.id.toString().padStart(3, '0')}`,
          nombre: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          tipo: data.types.map((type: any) => type.type.name).join(', '),
          vida: data.stats[0].base_stat,
          ataque: data.stats[1].base_stat,
          defensa: data.stats[2].base_stat
        };
      })
      .catch(error => {
        console.error('Error al obtener datos del Pokémon:', error);
      });
  }
}