import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent {
  @Input() imageURL: string = '';
  @Input() shinyImageURL: string = '';
  @Output() pokemonId = new EventEmitter<number>();

  currentImage: string = '';
  isShiny: boolean = false;

  ngOnChanges() {
    // Actualizar la imagen actual cuando cambian los inputs
    this.currentImage = this.imageURL;
    this.isShiny = false;
  }

  previousPokemon(): void {
    this.pokemonId.emit(-1);
  }

  nextPokemon(): void {
    this.pokemonId.emit(1);
  }

  toggleShiny(): void {
    if (this.isShiny) {
      this.currentImage = this.imageURL;
    } else {
      this.currentImage = this.shinyImageURL || this.imageURL;
    }
    this.isShiny = !this.isShiny;
  }

  // Método para buscar un Pokémon específico por número
  searchPokemon(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const input = event.target as HTMLInputElement;
      const number = parseInt(input.value);
      if (number >= 1 && number <= 898) {
        this.pokemonId.emit(number - this.getCurrentPokemonId());
        input.value = '';
      }
    }
  }

  private getCurrentPokemonId(): number {
    // Extraer el número del Pokémon actual de la URL de la imagen
    const urlParts = this.imageURL.split('/');
    const pokemonId = urlParts[urlParts.length - 1].split('.')[0];
    return parseInt(pokemonId) || 1;
  }
}