import { type CountryDisplay, type Country, countrySchema } from "@shared/schema";

export interface IStorage {
  getRandomCountry(): Promise<CountryDisplay>;
}

export class MemStorage implements IStorage {
  private cache: Country[] = [];
  private lastFetch: number = 0;
  private readonly CACHE_DURATION = 1000 * 60 * 60; // 1 hour

  async getRandomCountry(): Promise<CountryDisplay> {
    if (this.cache.length === 0 || Date.now() - this.lastFetch > this.CACHE_DURATION) {
      await this.fetchAllCountries();
    }

    const randomIndex = Math.floor(Math.random() * this.cache.length);
    const country = this.cache[randomIndex];

    return this.transformCountryData(country);
  }

  private async fetchAllCountries(): Promise<void> {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/independent?status=true"
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch countries: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error("Invalid API response: expected array of countries");
      }

      this.cache = data.map((country: any) => countrySchema.parse(country));
      this.lastFetch = Date.now();
      console.log(`[Cache] Successfully refreshed ${this.cache.length} countries`);
    } catch (error) {
      console.error("[Cache] Error fetching countries from REST Countries API:", error);
      if (this.cache.length === 0) {
        console.error("[Cache] No cached data available, cannot serve requests");
        throw new Error("No country data available");
      }
      console.warn(`[Cache] Using stale cache with ${this.cache.length} countries`);
    }
  }

  private transformCountryData(country: Country): CountryDisplay {
    const formatNumber = (num: number): string => {
      return new Intl.NumberFormat("en-US").format(num);
    };

    const languages = country.languages
      ? Object.values(country.languages).join(", ")
      : "N/A";

    const currencies = country.currencies
      ? Object.values(country.currencies)
          .map((c) => `${c.name}${c.symbol ? ` (${c.symbol})` : ""}`)
          .join(", ")
      : "N/A";

    const coordinates = country.latlng && country.latlng.length === 2
      ? [country.latlng[0], country.latlng[1]] as [number, number]
      : undefined;

    return {
      name: country.name.common,
      officialName: country.name.official,
      flag: country.flags.svg || country.flags.png,
      flagAlt: country.flags.alt || `Flag of ${country.name.common}`,
      capital: country.capital?.[0] || "N/A",
      region: country.region,
      subregion: country.subregion,
      population: formatNumber(country.population),
      area: country.area ? `${formatNumber(country.area)} km²` : "N/A",
      languages,
      currencies,
      coordinates,
      countryCode: country.cca2,
    };
  }
}

export const storage = new MemStorage();
