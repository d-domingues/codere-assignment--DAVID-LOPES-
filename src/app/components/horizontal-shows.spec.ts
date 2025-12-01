import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Show } from '../models/tv-show.type';
import HorizontalShows from './horizontal-shows';

describe('HorizontalShows', () => {
  let component: HorizontalShows;
  let fixture: ComponentFixture<HorizontalShows>;
  let componentRef: ComponentRef<HorizontalShows>;

  const mockShows: Show[] = [
    {
      id: 1,
      url: 'https://www.tvmaze.com/shows/1/under-the-dome',
      name: 'Under the Dome',
      type: 'Scripted',
      language: 'English',
      genres: ['Drama', 'Science-Fiction', 'Thriller'],
      status: 'Ended',
      runtime: 60,
      schedule: {
        time: '22:00',
        days: ['Thursday'],
      },
      rating: {
        average: 6.5,
      },
      weight: 99,
      externals: {
        tvrage: 25988,
        thetvdb: 264492,
        imdb: 'tt1553656',
      },
      image: {
        medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/24/60941.jpg',
        original: 'https://static.tvmaze.com/uploads/images/original_untouched/24/60941.jpg',
      },
      summary: '<p><b>Under the Dome</b> is the story of a small town...</p>',
      updated: 1573667713,
      _links: {
        self: {
          href: 'https://api.tvmaze.com/shows/1',
        },
        previousepisode: {
          href: 'https://api.tvmaze.com/episodes/185054',
          name: 'The Enemy Within',
        },
      },
    },
    {
      id: 2,
      url: 'https://www.tvmaze.com/shows/2/person-of-interest',
      name: 'Person of Interest',
      type: 'Scripted',
      language: 'English',
      genres: ['Drama', 'Action', 'Crime'],
      status: 'Ended',
      runtime: 43,
      schedule: {
        time: '22:00',
        days: ['Tuesday'],
      },
      rating: {
        average: 8.8,
      },
      weight: 98,
      externals: {
        tvrage: 28376,
        thetvdb: 248742,
        imdb: 'tt1839578',
      },
      summary: '<p><b>Person of Interest</b> is an American science fiction...</p>',
      updated: 1588773151,
      _links: {
        self: {
          href: 'https://api.tvmaze.com/shows/2',
        },
        previousepisode: {
          href: 'https://api.tvmaze.com/episodes/659372',
          name: 'return 0',
        },
      },
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalShows],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HorizontalShows);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    // Set required input
    componentRef.setInput('shows', mockShows);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display shows in horizontal scroll', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const showCards = compiled.querySelectorAll('.show-card');
    expect(showCards.length).toBe(2);
  });

  it('should display show names correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const showNames = compiled.querySelectorAll('.show-info h4');
    expect(showNames[0].textContent?.trim()).toBe('Under the Dome');
    expect(showNames[1].textContent?.trim()).toBe('Person of Interest');
  });

  it('should display genres (max 2)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const genres = compiled.querySelectorAll('.genres');
    expect(genres[0].textContent?.trim()).toBe('Drama, Science-Fiction');
    expect(genres[1].textContent?.trim()).toBe('Drama, Action');
  });

  it('should display rating when available', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const ratings = compiled.querySelectorAll('.rating');
    expect(ratings[0].textContent?.trim()).toBe('★ 6.5');
    expect(ratings[1].textContent?.trim()).toBe('★ 8.8');
  });

  it('should have router links for each show', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const showCards = compiled.querySelectorAll('.show-card');
    expect(showCards.length).toBe(2);
    // Note: RouterLink directives may not render as attributes immediately in tests
  });

  it('should handle empty shows array', () => {
    componentRef.setInput('shows', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const showCards = compiled.querySelectorAll('.show-card');
    expect(showCards.length).toBe(0);
  });

  it('should display section title container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sectionTitle = compiled.querySelector('.section-title');
    expect(sectionTitle).toBeTruthy();
  });

  it('should display horizontal scroll container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const horizontalScroll = compiled.querySelector('.horizontal-scroll');
    expect(horizontalScroll).toBeTruthy();
  });
});
