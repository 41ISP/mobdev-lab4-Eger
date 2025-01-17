interface IWeatherForecast {
	latitude: number;
	longitude: number;
	temperature: string;
	daily: string;
	timezone: string;
}

export enum Temperature {
	temperature,
	apparentTemperature,
	allTemperature
}

export enum DailyDto {
	sunrise,
	sunset,
	sunriseAndSunset
}

export class WeatherForecast implements IWeatherForecast {
	readonly latitude: number;

	readonly longitude: number;

	readonly temperature: string;

	readonly daily: string;

	readonly timezone: string;

	constructor(latitude: number, longitude: number, temperature: Temperature, daily: DailyDto, timezone = 'auto') {
		this.latitude = latitude
		this.longitude = longitude
		this.timezone = timezone

		switch (temperature) {
			case Temperature.temperature: {
				this.temperature = 'temperature_2m';
				break;
			}
			case Temperature.apparentTemperature: {
				this.temperature = 'apparent_temperature';
				break;
			}
			case Temperature.allTemperature: {
				this.temperature = 'temperature_2m,apparent_temperature';
				break;
			}
			default: {
				throw new Error(`Unsupported temperature: ${temperature}`);
			}
		}

		switch (daily) {
			case DailyDto.sunrise: {
				this.daily = 'sunrise';
				break;
			}
			case DailyDto.sunset: {
				this.daily = 'sunset';
				break;
			}
			case DailyDto.sunriseAndSunset: {
				this.daily = 'sunrise,sunset';
				break;
			}
			default: {
				throw new Error(`Unsupported daily: ${daily}`);
			}
		}
	}
}