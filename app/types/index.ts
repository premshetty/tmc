export interface City {
  id: string;
  name: string;
  country: string;
  weather?: WeatherData;
  places?: Place[];
  saved?: boolean;
}

export interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface Place {
  id: string;
  name: string;
  category: string;
  address: string;
  rating?: number;
  photo?: string;
}

export interface CountryInfo {
  name: string;
  capital: string;
  population: number;
  region: string;
  flag: string;
  languages: string[];
  currencies: string[];
  timezones: string[];
}