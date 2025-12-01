import { Component, input, model } from '@angular/core';
import { IonRange, IonSearchbar, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { FilterState } from '../models/fiters-state.type';

@Component({
  selector: 'codere-shows-filters',
  imports: [IonSearchbar, IonSelect, IonSelectOption, IonRange],
  styleUrl: 'shows-filters.scss',
  template: `
    <h3 [style.margin]="'0.5rem 0'">Search & Filter</h3>

    <ion-searchbar [value]="filters().search" (ionInput)="updateSearch($event)" placeholder="Search TV shows..." debounce="500" />

    <ion-select label="Genre" [value]="filters().genres" multiple (ionChange)="updateGenre($event)" placeholder="All Genres">
      @for (genre of genres(); track genre) {
        <ion-select-option [value]="genre">{{ genre }}</ion-select-option>
      }
    </ion-select>

    <ion-range
      [value]="filters().rating"
      (ionInput)="updateRating($event)"
      [min]="0"
      [max]="10"
      pin
      snaps
      [label]="'Min Rating: ' + filters().rating"
      labelPlacement="start"
      class="rating-range"
    />
  `,
})
export default class ShowsFilters {
  genres = input([], { transform: (genres: string[]) => genres.sort() });
  filters = model.required<FilterState>();

  updateSearch(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    this.filters.update((current) => ({ ...current, search: target.value?.toLowerCase() || '' }));
  }

  updateGenre(event: Event) {
    const target = event.target as HTMLIonSelectElement;
    this.filters.update((current) => ({ ...current, genres: target.value || [] }));
  }

  updateRating(event: Event) {
    const target = event.target as HTMLIonSelectElement;
    this.filters.update((current) => ({ ...current, rating: +target.value || 0 }));
  }
}
