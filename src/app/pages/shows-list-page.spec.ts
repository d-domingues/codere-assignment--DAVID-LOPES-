import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvMazeApiService } from '../services/tv-maze-api.service';
import ShowsListPage from './shows-list-page';

describe('ShowsListPage', () => {
  let component: ShowsListPage;
  let fixture: ComponentFixture<ShowsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowsListPage],
      providers: [provideHttpClient(), provideHttpClientTesting(), TvMazeApiService],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default filters', () => {
    expect(component.filters().search).toBe('');
    expect(component.filters().genres).toEqual([]);
    expect(component.filters().rating).toBe(8);
  });

  it('should determine search mode correctly', () => {
    // Initially not in search mode
    expect(component.isSearchMode()).toBeFalse();

    // Update filters to include search
    component.filters.set({
      search: 'breaking bad',
      genres: [],
      rating: 0,
    });

    expect(component.isSearchMode()).toBeTrue();
  });

  it('should display correct template sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('ion-header')).toBeTruthy();
    expect(compiled.querySelector('ion-title')).toBeTruthy();
    expect(compiled.querySelector('codere-shows-filters')).toBeTruthy();
  });

  it('should update filters correctly', () => {
    const newFilters = {
      search: 'new search',
      genres: ['Drama'],
      rating: 7,
    };

    component.filters.set(newFilters);

    expect(component.filters().search).toBe('new search');
    expect(component.filters().genres).toEqual(['Drama']);
    expect(component.filters().rating).toBe(7);
  });

  it('should have resources array', () => {
    expect(component.resources).toBeDefined();
    expect(Array.isArray(component.resources)).toBeTruthy();
    expect(component.resources.length).toBe(4);
  });

  it('should have computed properties', () => {
    expect(component.shows).toBeDefined();
    expect(component.genres).toBeDefined();
    expect(component.getShowsByGenre).toBeDefined();
    expect(component.popularShows).toBeDefined();
    expect(component.searchShows).toBeDefined();
  });
});
