import { Show } from '../models/tv-show.type';

describe('Show Type', () => {
  it('should define correct structure', () => {
    const show: Show = {
      id: 1,
      url: 'https://www.tvmaze.com/shows/1/test',
      name: 'Test Show',
      type: 'Scripted',
      language: 'English',
      genres: ['Drama'],
      status: 'Running',
      runtime: 60,
      schedule: {
        time: '20:00',
        days: ['Monday'],
      },
      rating: {
        average: 8.5,
      },
      weight: 100,
      externals: {
        tvrage: 123,
        thetvdb: 456,
        imdb: 'tt1234567',
      },
      updated: 1234567890,
      _links: {
        self: {
          href: 'https://api.tvmaze.com/shows/1',
        },
        previousepisode: {
          href: 'https://api.tvmaze.com/episodes/1',
          name: 'Pilot',
        },
      },
    };

    expect(show.id).toBe(1);
    expect(show.name).toBe('Test Show');
    expect(show.genres).toEqual(['Drama']);
    expect(show.rating?.average).toBe(8.5);
  });
});
