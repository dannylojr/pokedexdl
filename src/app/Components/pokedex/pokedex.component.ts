import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'],
  animations: [
    trigger('imageChange', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PokedexComponent implements OnChanges {
  @Input() imageURL: string = "";
  @Input() shinyImageURL: string = "";
  @Input() megaImageURL: string = "";
  @Output() pokemonId: EventEmitter<number> = new EventEmitter();

  currentImage: string = '';
  currentForm: 'normal' | 'shiny' | 'mega' = 'normal';
  hasMega: boolean = false;

  ngOnChanges() {
    this.currentImage = this.imageURL;
    this.currentForm = 'normal';
    this.hasMega = !!this.megaImageURL;
  }

  previousPokemon(): void {
    this.pokemonId.emit(-1);
  }

  nextPokemon(): void {
    this.pokemonId.emit(1);
  }

  showShiny() {
    this.currentImage = this.shinyImageURL || this.imageURL;
    this.currentForm = 'shiny';
  }

  showNormal() {
    this.currentImage = this.imageURL;
    this.currentForm = 'normal';
  }

  showMega() {
    if (this.hasMega) {
      this.currentImage = this.megaImageURL;
      this.currentForm = 'mega';
    }
  }
}