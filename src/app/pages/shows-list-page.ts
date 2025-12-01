import { Component, computed, inject, signal } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import HorizontalShows from '../components/horizontal-shows';
import ShowsFilters from '../components/shows-filters';
import { FilterState } from '../models/fiters-state.type';
import { Show } from '../models/tv-show.type';
import { TvMazeApiService } from '../services/tv-maze-api.service';

@Component({
  selector: 'codere-shows-list-page',
  imports: [ShowsFilters, HorizontalShows, IonHeader, IonToolbar, IonContent, IonTitle],
  styles: 'ion-content > * { margin-bottom: 1.5rem; }',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>TV Shows</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">TV Shows</ion-title>
        </ion-toolbar>
      </ion-header>

      <codere-shows-filters [genres]="genres()" [(filters)]="filters" />

      @if (isSearchMode()) {
        <codere-horizontal-shows [shows]="searchShows()"> Search Results </codere-horizontal-shows>
      } @else {
        @for (genre of genres(); track genre) {
          @let genreShows = getShowsByGenre().get(genre) || [];
          @if (genreShows.length > 0) {
            <codere-horizontal-shows [shows]="genreShows"> {{ genre }} Shows </codere-horizontal-shows>
          }
        }
      }
    </ion-content>
  `,
})
export default class ShowsListPage {
  private apiService = inject(TvMazeApiService);

  resources = [
    this.apiService.getShowsByPage(0),
    this.apiService.getShowsByPage(1),
    this.apiService.getShowsByPage(2),
    this.apiService.getShowsByPage(3),
  ];

  shows = computed(() => this.resources.map((res) => (res.hasValue() ? res.value() : [])).flat());

  genres = computed(() => [...new Set(this.shows().flatMap((show) => show.genres))]);

  getShowsByGenre = computed(() => {
    const showsByGenre = new Map<string, Show[]>();
    const { rating, genres: selectedGenres } = this.filters();

    const genresToShow = selectedGenres.length > 0 ? selectedGenres : this.genres();

    genresToShow.forEach((genre) => {
      const genreShows = this.shows()
        .filter((show) => show.genres.includes(genre) && (!rating || (show.rating?.average || 0) >= rating))
        .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
        .slice(0, 12);

      showsByGenre.set(genre, genreShows);
    });

    return showsByGenre;
  });

  filters = signal<FilterState>({
    search: '',
    genres: [],
    rating: 8,
  });

  isSearchMode = computed(() => this.filters().search.trim() !== '');

  // Search functionality
  searchQuery = computed(() => this.filters().search.trim());
  searchResource = this.apiService.searchShows(this.searchQuery);
  searchShows = computed(() => {
    if (!this.searchResource.hasValue()) return [] as Show[];
    const { rating, genres: selectedGenres } = this.filters();
    return this.searchResource
      .value()
      .map((result) => result.show)
      .filter((show) => {
        const meetsRating = !rating || (show.rating?.average || 0) >= rating;
        const meetsGenre = selectedGenres.length === 0 || selectedGenres.some((genre) => show.genres.includes(genre));
        return meetsRating && meetsGenre;
      });
  });
}
