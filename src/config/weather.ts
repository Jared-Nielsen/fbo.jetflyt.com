export const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '';

export type WeatherLayer = 'precipitation' | 'temp' | 'wind' | 'pressure' | 'clouds';

export const WEATHER_LAYERS: Record<WeatherLayer, string> = {
  precipitation: 'precipitation_new',
  temp: 'temp_new',
  wind: 'wind_new',
  pressure: 'pressure_new',
  clouds: 'clouds_new'
};

export const WEATHER_TILE_URL = 'https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={apiKey}';

export const isWeatherConfigured = () => Boolean(WEATHER_API_KEY);