import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Show } from '../models/tv-show.type';

@Component({
  selector: 'codere-horizontal-shows',
  imports: [RouterLink, DecimalPipe],
  styleUrl: './horizontal-shows.scss',
  template: `
    <h2 class="section-title">
      <ng-content />
    </h2>

    <div class="horizontal-scroll">
      @for (show of shows(); track show.id) {
        <div class="show-card" [routerLink]="'details/' + show.id">
          <div class="show-image">
            @if (show.image?.medium) {
              <img [src]="show.image!.medium" [alt]="show.name" loading="lazy" />
            } @else {
              <div class="no-image">No Image</div>
            }
            @if (show.rating?.average) {
              <div class="rating">★ {{ show.rating!.average | number: '1.1-1' }}</div>
            }
          </div>
          <div class="show-info">
            <h4>{{ show.name }}</h4>
            <p class="genres">{{ show.genres.slice(0, 2).join(', ') }}</p>
          </div>
        </div>
      }
    </div>
  `,
})
export default class HorizontalShows {
  shows = input.required<Show[]>();
}
