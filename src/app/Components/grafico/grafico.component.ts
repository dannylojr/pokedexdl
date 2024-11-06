import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent {
  // Estos Inputs se corresponden con las variables usadas en el template
  @Input() id: string = "#000";                // Usado en {{id}}
  @Input() nombrePokemon: string = "UNKNOWN";   // Usado en {{nombrePokemon}}
  @Input() tipoPokemon: string = "NORMAL";      // Usado en {{tipoPokemon}} y en la clase dinámica
  @Input() vidaPokemon: number = 0;            // Usado en el cálculo de width y en {{vidaPokemon}}
  @Input() ataquePokemon: number = 0;          // Usado en el cálculo de width y en {{ataquePokemon}}
  @Input() defensaPokemon: number = 0;         // Usado en el cálculo de width y en {{defensaPokemon}}

  // Podríamos añadir métodos útiles para el template
  getTypeClass(): string {
    // Obtiene el primer tipo en caso de que haya varios
    return 'type-' + this.tipoPokemon.toLowerCase().split(',')[0].trim();
  }

  // Métodos para calcular los porcentajes de las stats
  getHPPercentage(): number {
    return (this.vidaPokemon / 255) * 100;
  }

  getATKPercentage(): number {
    return (this.ataquePokemon / 190) * 100;
  }

  getDEFPercentage(): number {
    return (this.defensaPokemon / 230) * 100;
  }
}