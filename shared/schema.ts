import { z } from "zod";

export const countrySchema = z.object({
  name: z.object({
    common: z.string(),
    official: z.string(),
  }),
  capital: z.array(z.string()).optional(),
  region: z.string(),
  subregion: z.string().optional(),
  population: z.number(),
  area: z.number().optional(),
  languages: z.record(z.string()).optional(),
  currencies: z.record(z.object({
    name: z.string(),
    symbol: z.string().optional(),
  })).optional(),
  flags: z.object({
    png: z.string(),
    svg: z.string(),
    alt: z.string().optional(),
  }),
  latlng: z.array(z.number()).optional(),
  cca2: z.string(),
  cca3: z.string(),
});

export type Country = z.infer<typeof countrySchema>;

export interface CountryDisplay {
  name: string;
  officialName: string;
  flag: string;
  flagAlt: string;
  capital: string;
  region: string;
  subregion?: string;
  population: string;
  area: string;
  languages: string;
  currencies: string;
  coordinates?: [number, number];
  countryCode: string;
}
