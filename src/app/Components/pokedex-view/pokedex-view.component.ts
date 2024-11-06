import { Component, OnInit } from '@angular/core';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { GraficoComponent } from '../grafico/grafico.component';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-pokedex-view',
  standalone: true,
  imports: [CommonModule, PokedexComponent, GraficoComponent],
  templateUrl: './pokedex-view.component.html',
  styleUrls: ['./pokedex-view.component.css'],
  animations: [
    trigger('pokemonChange', [
        transition(':enter', [
            style({ opacity: 0, transform: 'scale(0.8)' }),
            animate('300ms ease-out', 
                style({ opacity: 1, transform: 'scale(1)' }))
        ]),
        transition(':leave', [
            animate('300ms ease-in', 
                style({ opacity: 0, transform: 'scale(0.8)' }))
        ])
    ])
]
})
export class PokedexViewComponent{
  pokemonId: number = 1;
  pokemonImagen: string = '';
  pokemonData: any = {};

  constructor() {
    this.obtenerDatosPokemon(this.pokemonId);
  }

  private obtenerDatosPokemon(id: number): void {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data => {
        this.pokemonImagen = data.sprites.front_default;
        this.pokemonData = {
          id: `#${data.id.toString().padStart(3, '0')}`,
          nombre: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          // Convertimos los tipos a un string unido por comas
          tipo: data.types.map((type: any) => 
            type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
          ).join(', '),
          vida: data.stats[0].base_stat,
          ataque: data.stats[1].base_stat,
          defensa: data.stats[2].base_stat
        };
      })
      .catch(error => console.error('Error:', error));
}
}