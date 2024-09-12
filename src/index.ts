// Global constant for Martian sol length
export const SECONDS_PER_SOL = 88775.244;

export const SECONDS_PER_DAY = 86400;

class MarsMoment {
  private earthDate: Date;
  private marsSol: Date;

  constructor(date: string) {
    this.earthDate = date ? new Date(date) : new Date();
    this.marsSol = this.calculateMartianSol(this.earthDate);
  }

  static now(): MarsMoment {
    return new MarsMoment(new Date().toISOString());
  }

  private calculateMartianSol = (earthDate: Date): Date => {
    const earthTimeInSeconds = earthDate.getTime() / 1000;
    const martianTimeInSeconds = earthTimeInSeconds * (SECONDS_PER_SOL / SECONDS_PER_DAY);

    return new Date(martianTimeInSeconds * 1000);
  }

  public add(value: number, unit: 'sol' | 'day'): MarsMoment {
    if (unit === 'sol') {
      this.marsSol.setSeconds(this.marsSol.getSeconds() + value + SECONDS_PER_SOL);
    } else if (unit === 'day') {
      this.earthDate.setDate(this.earthDate.getDate() + value);
      this.marsSol = this.calculateMartianSol(this.earthDate);
    }
    return this;
  }

  public format(): string {
    return this.marsSol.toISOString();
  }

  public withTerra(): string {
    return `${this.format()} (Earth: ${this.earthDate.toISOString()})`;
  }

  public clone(): MarsMoment {
    return new MarsMoment(this.earthDate.toISOString());
  }
}

export default MarsMoment;