import { FilterState } from '../models/fiters-state.type';

describe('FilterState Type', () => {
  it('should define correct structure', () => {
    const filter: FilterState = {
      search: 'test',
      genres: ['Action', 'Drama'],
      rating: 8.5,
    };

    expect(filter.search).toBe('test');
    expect(filter.genres).toEqual(['Action', 'Drama']);
    expect(filter.rating).toBe(8.5);
  });
});
