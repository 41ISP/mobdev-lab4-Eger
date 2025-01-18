import axios, {AxiosResponse} from "axios";
import {WeatherForecast} from "./api.dto.ts";
import {IWeatherForecastRdo, IResponse} from "./api.rdo.ts";

const OpenMeteoURL = 'https://api.open-meteo.com/v1/forecast'

const Yandex_API_KEY = import.meta.env.VITE_API_KEY
const YandexGeoURL = 'https://geocode-maps.yandex.ru/1.x/'

/**
 * Represents Open-Metio API
 * https://api.open-meteo.com/#
 */
const OpenMeteoAPIAxios = axios.create({baseURL: OpenMeteoURL})

export const OpenMeteoAPI = {
	getWeatherForecast: async (weatherForecast: WeatherForecast):Promise<AxiosResponse<IWeatherForecastRdo> | undefined> => {
		try {
			return await OpenMeteoAPIAxios.get<IWeatherForecastRdo>(
				`${OpenMeteoURL}`,
				{
					params: {
						latitude: weatherForecast.latitude,
						longitude: weatherForecast.longitude,
						hourly: weatherForecast.temperature,
						daily: weatherForecast.daily,
						timezone: weatherForecast.timezone
					}
				}
			);
		} catch (err) {
			console.error(err)
		}
	}
}

const YandexGeoAPIAxios = axios.create({baseURL: YandexGeoURL})

export const YandexGeoAPI = {
	
	getCoordinates: async(address: string) => {
		try {
			console.log('in api call '+address);
			
			return await YandexGeoAPIAxios.get<IResponse>(
				`${YandexGeoURL}`,
				{
					params: {
						apikey: Yandex_API_KEY?.toString(),
						geocode: address,
						format: 'json'
					}
				}
			)
		} catch (err) {
			console.error(err)
		}
	}
}