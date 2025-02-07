import {IWeatherListProps} from "../../shared/props.ts";
import {Sheet, Typography} from "@mui/joy";
import dateFormat from "dateformat"
import {useEffect, useState} from "react";

const DetailedWeather = (props: IWeatherListProps) => {
	const nowWithoutMinutes = new Date(new Date(Date.now()).setMinutes(0))
	const dateMask = 'HH:MM dd.mm.yyyy'
	const [currentTemperature, setCurrentTemperature] = useState<number>()
	const [currentApparentTemperature, setCurrentApparentTemperature] = useState<number>()
	const [windSpeed, setWindSpeed] = useState<number>()

	useEffect(() => {
		for (let i = 0; i < props.weatherForecast.hourly.time.length; i++) {
			if(dateFormat(props.weatherForecast.hourly.time[i], dateMask) == dateFormat(nowWithoutMinutes, dateMask)) {
				setCurrentTemperature(props.weatherForecast.hourly.temperature_2m[i])
				setCurrentApparentTemperature(props.weatherForecast.hourly.apparent_temperature[i])
				setWindSpeed(props.weatherForecast.hourly.wind_speed_10m[i])
			}
		}
	}, [nowWithoutMinutes])



	return (
		<Sheet
			style={{borderRadius: '0.5rem', padding: '0.5rem', marginTop: '1rem', textAlign: 'center'}}
			variant="outlined">
			<Typography
				level="h1"
			>
				{dateFormat(nowWithoutMinutes, dateMask)}
			</Typography>
			<Typography
				level="h2"
			>
				Температура: {currentTemperature}°
			</Typography>
			<Typography
				level="h3"
			>
				Ощущается как: {currentApparentTemperature}°
			</Typography>
			<Typography
				level="h4"
			>
				Ветер: {windSpeed} м/с
			</Typography>
		</Sheet>
	)
}

export default DetailedWeather