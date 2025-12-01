import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TvMazeApiService } from '../services/tv-maze-api.service';

@Component({
  selector: 'codere-details-page',
  imports: [IonHeader, IonToolbar, IonContent, IonTitle, IonButtons, IonBackButton],
  styleUrl: './details-page.scss',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ showDetails.value()?.name }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ showDetails.value()?.name }}</ion-title>
        </ion-toolbar>
      </ion-header>

      @if (showDetails.hasValue()) {
        @let details = showDetails.value();

        <div class="detail-header">
          <img [src]="details.image?.medium" [alt]="details.name" class="detail-image" />
        </div>

        <div class="detail-info">
          <p><strong>Rating:</strong> {{ details.rating?.average || 'N/A' }}</p>
          <p><strong>Genres:</strong> {{ details.genres.join(', ') }}</p>
          <p><strong>Status:</strong> {{ details.status }}</p>
          <p><strong>Runtime:</strong> {{ details.runtime }} minutes</p>
          <p><strong>Network:</strong> {{ details.network?.name || 'N/A' }}</p>
          @if (details.premiered) {
            <p><strong>Premiered:</strong> {{ details.premiered }}</p>
          }
          @if (details.summary) {
            <div class="summary">
              <h3>Summary</h3>
              <div [innerHTML]="sanitizedSummary()"></div>
            </div>
          }
        </div>
      } @else if (showDetails.error()) {
        <p class="error-state">Error loading show details.</p>
      } @else if (showDetails.isLoading()) {
        <p class="loading-state">Loading show details...</p>
      } @else {
        <p class="no-data-state">No show ID provided.</p>
      }
    </ion-content>
  `,
})
export default class DetailsPage {
  id = input.required<number>();
  sanitizer = inject(DomSanitizer);
  showDetails = inject(TvMazeApiService).getShowById(this.id);
  sanitizedSummary = computed(() => this.sanitizer.bypassSecurityTrustHtml(this.showDetails.value()?.summary ?? ''));
}
