export interface IWeatherForecastRdo {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	hourly_units: IHourlyUnits;
	hourly: IHourly;
	daily_units: IDailyUnits;
	daily: IDailyRdo;
}

export interface IDailyRdo {
	time: string[];
	sunrise: string[];
	sunset: string[];
}

export interface IDailyUnits {
	time: string;
	sunrise: string;
	sunset: string;
}

export interface IHourly {
	time: string[];
	temperature_2m: number[];
	apparent_temperature: number[];
}

export interface IHourlyUnits {
	time: string;
	temperature_2m: string;
	apparent_temperature: string;
}