import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  @Input() id: string = "#000";
  @Input() nombrePokemon: string = "UNKNOWN";
  @Input() tipoPokemon: string = "NORMAL";
  @Input() vidaPokemon: number = 0;
  @Input() ataquePokemon: number = 0;
  @Input() defensaPokemon: number = 0;
  @Input() velocidadPokemon: number = 0;

  // Propiedades calculadas
  primaryType: string = '';
  isHighHP: boolean = false;
  isHighAtk: boolean = false;
  isHighDef: boolean = false;

  ngOnInit() {
    this.updatePrimaryType();
    this.checkHighStats();
  }

  ngOnChanges() {
    this.updatePrimaryType();
    this.checkHighStats();
  }

  private updatePrimaryType(): void {
    // Obtiene el primer tipo en caso de tipos múltiples
    this.primaryType = this.tipoPokemon.split(',')[0].trim();
  }

  private checkHighStats(): void {
    // Considera una estadística "alta" si está por encima del 75% del máximo
    this.isHighHP = this.vidaPokemon > (255 * 0.75);
    this.isHighAtk = this.ataquePokemon > (190 * 0.75);
    this.isHighDef = this.defensaPokemon > (230 * 0.75);
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

  getSpeedPercentage(): number {
    return (this.velocidadPokemon / 200) * 100; // Asumiendo 200 como máximo para velocidad
  }

  // Método para obtener la clase del tipo
  getTypeClass(type: string): string {
    return 'type-' + type.toLowerCase().trim();
  }

  // Método para obtener el color de fondo según el tipo
  getTypeColor(): string {
    const typeColors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };

    return typeColors[this.primaryType.toLowerCase()] || '#A8A878';
  }

  // Método para obtener el color del texto según el tipo
  getTextColor(): string {
    const darkTypes = ['electric', 'ice', 'fairy', 'steel'];
    return darkTypes.includes(this.primaryType.toLowerCase()) ? '#000000' : '#FFFFFF';
  }

  // Método para obtener la descripción de la stat
  getStatDescription(stat: string): string {
    const descriptions: { [key: string]: string } = {
      hp: 'Puntos de vida totales',
      atk: 'Poder de ataque físico',
      def: 'Capacidad de defensa física',
      speed: 'Velocidad de movimiento'
    };
    return descriptions[stat] || '';
  }

  // Método para obtener el ícono de la stat
  getStatIcon(stat: string): string {
    const icons: { [key: string]: string } = {
      hp: '❤️',
      atk: '⚔️',
      def: '🛡️',
      speed: '⚡'
    };
    return icons[stat] || '';
  }

  // Método para formatear números
  formatNumber(num: number): string {
    return num.toString().padStart(3, '0');
  }

  // Método para determinar si una stat es destacada
  isStatHighlighted(value: number, maxValue: number): boolean {
    return (value / maxValue) > 0.8;
  }

  // Método para obtener el mensaje de estado de la stat
  getStatStatus(stat: string, value: number): string {
    const thresholds = {
      hp: { low: 50, medium: 80, high: 120 },
      atk: { low: 40, medium: 70, high: 100 },
      def: { low: 45, medium: 75, high: 110 },
      speed: { low: 35, medium: 65, high: 95 }
    };

    const getStatus = (value: number, threshold: any) => {
      if (value <= threshold.low) return 'Bajo';
      if (value <= threshold.medium) return 'Medio';
      if (value <= threshold.high) return 'Alto';
      return 'Muy Alto';
    };

    return getStatus(value, thresholds[stat as keyof typeof thresholds]);
  }
}