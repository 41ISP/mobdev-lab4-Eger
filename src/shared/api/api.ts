import axios, {AxiosResponse} from "axios";
import {WeatherForecast} from "./api.dto.ts";
import {IWeatherForecastRdo} from "./api.rdo.ts";

const BaseURL = 'https://api.open-meteo.com/v1/forecast'

/**
 * Represents Open-Metio API
 * https://api.open-meteo.com/#
 */
const OpenMetioAPIAxios = axios.create({baseURL: BaseURL})

const OpenMetioAPI = {
	getWeatherForecast: async (weatherForecast: WeatherForecast):Promise<AxiosResponse<IWeatherForecastRdo> | undefined> => {
		try {
			return await OpenMetioAPIAxios.get<IWeatherForecastRdo>(
				`${BaseURL}`,
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

export default OpenMetioAPI