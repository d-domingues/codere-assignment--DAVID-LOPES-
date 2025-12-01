import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TvMazeApiService } from './tv-maze-api.service';

describe('TvMazeApiService', () => {
  let service: TvMazeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), TvMazeApiService],
    });
    service = TestBed.inject(TvMazeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have correct base URL', () => {
    expect((service as any).baseUrl).toBe('https://api.tvmaze.com');
  });

  it('should have getShowsByPage method', () => {
    expect(service.getShowsByPage).toBeDefined();
    expect(typeof service.getShowsByPage).toBe('function');
  });

  it('should have searchShows method', () => {
    expect(service.searchShows).toBeDefined();
    expect(typeof service.searchShows).toBe('function');
  });

  it('should have getShowById method', () => {
    expect(service.getShowById).toBeDefined();
    expect(typeof service.getShowById).toBe('function');
  });
});
