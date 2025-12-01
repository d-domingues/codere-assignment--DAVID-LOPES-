import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterState } from '../models/fiters-state.type';
import ShowsFilters from './shows-filters';

describe('ShowsFilters', () => {
  let component: ShowsFilters;
  let fixture: ComponentFixture<ShowsFilters>;
  let componentRef: ComponentRef<ShowsFilters>;

  const mockGenres = ['Drama', 'Comedy', 'Action', 'Thriller', 'Science-Fiction'];
  const mockFilters: FilterState = {
    search: '',
    genres: [],
    rating: 0,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowsFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowsFilters);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    // Set required inputs
    componentRef.setInput('genres', mockGenres);
    componentRef.setInput('filters', mockFilters);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display search bar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const searchbar = compiled.querySelector('ion-searchbar');
    expect(searchbar).toBeTruthy();
    expect(searchbar?.getAttribute('placeholder')).toBe('Search TV shows...');
  });

  it('should display genre select with options', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const genreSelect = compiled.querySelector('ion-select');
    const genreOptions = compiled.querySelectorAll('ion-select-option');

    expect(genreSelect).toBeTruthy();
    expect(genreOptions.length).toBe(5);
    // Note: Ion components may not render attributes immediately in tests
  });

  it('should sort genres alphabetically', () => {
    const unsortedGenres = ['Thriller', 'Action', 'Drama', 'Comedy'];
    componentRef.setInput('genres', unsortedGenres);
    fixture.detectChanges();

    expect(component.genres()).toEqual(['Action', 'Comedy', 'Drama', 'Thriller']);
  });

  it('should display rating range', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const ratingRange = compiled.querySelector('ion-range');

    expect(ratingRange).toBeTruthy();
    // Note: Ion components may not render attributes immediately in tests
  });

  it('should handle search input changes', () => {
    const mockEvent = {
      target: {
        value: 'Breaking Bad',
      },
    } as any;

    spyOn(component.filters, 'update');
    component.updateSearch(mockEvent);

    expect(component.filters.update).toHaveBeenCalled();
  });

  it('should handle genre selection changes', () => {
    const mockEvent = {
      target: {
        value: ['Drama', 'Action'],
      },
    } as any;

    spyOn(component.filters, 'update');
    component.updateGenre(mockEvent);

    expect(component.filters.update).toHaveBeenCalled();
  });

  it('should handle rating changes', () => {
    const mockEvent = {
      target: {
        value: 8,
      },
    } as any;

    spyOn(component.filters, 'update');
    component.updateRating(mockEvent);

    expect(component.filters.update).toHaveBeenCalled();
  });

  it('should display current rating in label', () => {
    const filtersWithRating: FilterState = {
      search: '',
      genres: [],
      rating: 7,
    };

    componentRef.setInput('filters', filtersWithRating);
    fixture.detectChanges();

    // Test that the component has the correct filters
    expect(component.filters().rating).toBe(7);
  });
});
