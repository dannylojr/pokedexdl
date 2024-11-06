import { Component, OnInit } from '@angular/core';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { GraficoComponent } from '../grafico/grafico.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokedex-view',
  standalone: true,
  imports: [CommonModule, PokedexComponent, GraficoComponent, FormsModule],
  templateUrl: './pokedex-view.component.html',
  styleUrls: ['./pokedex-view.component.css']
})
export class PokedexViewComponent implements OnInit {
  pokemonId: number = 1;
  pokemonImagen: string = '';
  pokemonImagenShiny: string = '';
  pokemonData: any = {};
  isLoading: boolean = true;
  errorMessage: string = '';
  searchQuery: string = '';

  constructor() { }

  ngOnInit(): void {
    this.obtenerDatosPokemon(this.pokemonId);
  }

  changePokemon(cambio: number): void {
    const newId = this.pokemonId + cambio;
    if (newId >= 1 && newId <= 898) {
      this.pokemonId = newId;
      this.obtenerDatosPokemon(this.pokemonId);
    }
  }

  searchPokemon(): void {
    this.errorMessage = '';
    if (!this.searchQuery.trim()) {
      this.errorMessage = 'Por favor, ingresa un nombre o número de Pokémon';
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    
    // Si es un número
    if (!isNaN(Number(query))) {
      const id = parseInt(query);
      if (id >= 1 && id <= 898) {
        this.pokemonId = id;
        this.obtenerDatosPokemon(id);
      } else {
        this.errorMessage = 'El número debe estar entre 1 y 898';
      }
      return;
    }

    // Si es un nombre
    this.isLoading = true;
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Pokémon no encontrado');
        }
        return response.json();
      })
      .then(data => {
        this.pokemonId = data.id;
        this.procesarDatosPokemon(data);
      })
      .catch(error => {
        console.error('Error:', error);
        this.errorMessage = 'Pokémon no encontrado. Verifica el nombre o número.';
        this.isLoading = false;
      });
  }

  private obtenerDatosPokemon(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => this.procesarDatosPokemon(data))
      .catch(error => {
        console.error('Error:', error);
        this.errorMessage = 'Error al cargar los datos del Pokémon';
        this.isLoading = false;
      });
  }

  private procesarDatosPokemon(data: any): void {
    this.pokemonImagen = data.sprites.front_default;
    this.pokemonImagenShiny = data.sprites.front_shiny;
    
    this.pokemonData = {
      id: `#${data.id.toString().padStart(3, '0')}`,
      nombre: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      tipo: data.types.map((type: any) => 
        type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
      ).join(', '),
      vida: data.stats[0].base_stat,
      ataque: data.stats[1].base_stat,
      defensa: data.stats[2].base_stat,
      velocidad: data.stats[5].base_stat,
      altura: (data.height / 10).toFixed(1), // Convertir a metros
      peso: (data.weight / 10).toFixed(1) // Convertir a kilogramos
    };
    
    this.isLoading = false;
    this.searchQuery = ''; // Limpiar el campo de búsqueda después de una búsqueda exitosa
  }

  // Método para limpiar la búsqueda
  clearSearch(): void {
    this.searchQuery = '';
    this.errorMessage = '';
  }

  // Método para manejar el evento keyup.enter
  handleEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchPokemon();
    }
  }

  // Método para validar entrada numérica
  validateNumericInput(event: KeyboardEvent): void {
    const input = event.key;
    if (!/[\d\backspace\delete\arrowleft\arrowright\tab]/.test(input.toLowerCase())) {
      event.preventDefault();
    }
  }
}