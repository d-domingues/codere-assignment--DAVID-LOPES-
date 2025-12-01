import { httpResource } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { Show } from '../models/tv-show.type';

@Injectable({ providedIn: 'root' })
export class TvMazeApiService {
  private readonly baseUrl = 'https://api.tvmaze.com';

  /**
   * Get shows by page number
   * @param page Page number (0-based)
   * @returns HTTP resource for shows array
   */
  getShowsByPage(page: number) {
    return httpResource<Show[]>(() => `${this.baseUrl}/shows?page=${page}`);
  }

  /**
   * Search shows by query term
   * @param query Search query
   * @returns HTTP resource for search results
   */
  searchShows(query: Signal<string>) {
    return httpResource<{ show: Show }[]>(() => (query() ? `${this.baseUrl}/search/shows?q=${encodeURIComponent(query())}` : undefined));
  }

  /**
   * Get show details by ID
   * @param id Show ID
   * @returns HTTP resource for single show
   */
  getShowById(id: Signal<number>) {
    return httpResource<Show>(() => `${this.baseUrl}/shows/${id()}`);
  }
}
