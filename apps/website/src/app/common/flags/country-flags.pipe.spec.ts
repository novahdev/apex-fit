import { CountryFlagsPipe } from './country-flags.pipe';

describe('CountryFlagsPipe', () => {
  it('create an instance', () => {
    const pipe = new CountryFlagsPipe();
    expect(pipe).toBeTruthy();
  });
});
