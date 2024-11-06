import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnChanges {
  @Input() id: string = "#000";
  @Input() nombrePokemon: string = "UNKNOWN";
  @Input() tipoPokemon: string = "NORMAL";
  @Input() vidaPokemon: number = 0;
  @Input() ataquePokemon: number = 0;
  @Input() defensaPokemon: number = 0;
  @Input() imagenNormal: string = '';
  @Input() imagenShiny: string = '';
  @Input() imagenMega: string = '';

  currentImage: string = '';
  hasMega: boolean = false;

  ngOnChanges() {
    this.currentImage = this.imagenNormal;
    this.hasMega = !!this.imagenMega;
  }

  showShiny() {
    this.currentImage = this.imagenShiny || this.imagenNormal;
  }

  showNormal() {
    this.currentImage = this.imagenNormal;
  }

  showMega() {
    if (this.hasMega) {
      this.currentImage = this.imagenMega;
    }
  }
}