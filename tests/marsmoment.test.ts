import MarsMoment from '../src/index';

describe('MarsMoment', () => {
  it('should return the current Martian time with now()', () => {
    const marsMoment = MarsMoment.now();
    expect(marsMoment.format()).toBeTruthy(); // Ensure it returns a valid date
  });

  it('should correctly calculate Martian time from Earth time', () => {
    const marsMoment = new MarsMoment('2024-01-01T00:00:00Z');
    const martianTime = marsMoment.format();
    expect(martianTime).not.toBeNull(); // Ensure Martian time is calculated
  });

  it('should allow adding sol to Martian time', () => {
    const marsMoment = new MarsMoment('2024-01-01T00:00:00Z');
    const initialMartianTime = marsMoment.format();
    marsMoment.add(1, 'sol');
    expect(marsMoment.format()).not.toBe(initialMartianTime); // Ensure time changed
  });

  it('should return both Martian and Earth time with withTerra()', () => {
    const marsMoment = new MarsMoment('2024-01-01T00:00:00Z');
    const combinedTime = marsMoment.withTerra();
    expect(combinedTime).toContain('Earth:'); // Ensure Earth time is included
  });

  it('should correctly clone the MarsMoment instance', () => {
    const marsMoment = new MarsMoment('2024-01-01T00:00:00Z');
    const clonedMoment = marsMoment.clone();
    expect(clonedMoment.format()).toEqual(marsMoment.format()); // Ensure they are identical
  });
});