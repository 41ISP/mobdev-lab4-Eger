import { useEffect, useState } from "react";
import {Alert, Box, IconButton, Input, Typography} from "@mui/joy";
import SearchIcon from '@mui/icons-material/Search';
import ReportIcon from '@mui/icons-material/Report';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { OpenMeteoAPI, YandexGeoAPI } from "./shared/api/api.ts";
import { DailyDto, Temperature, WeatherForecast } from "./shared/api/api.dto.ts";
import { IWeatherForecastRdo } from "./shared/api/api.rdo.ts";
import {Form} from "react-router-dom";
import WeatherList from "./widgets/WeatherList/WeatherList.tsx";
import DetailedWeather from "./widgets/DetailedWeather/DetailedWeather.tsx";

function App() {
	const [address, setAddress] = useState('')

	const [latitude, setLatitude] = useState<number>()
	const [longitude, setLongitude] = useState<number>()

	// const [hasLocation, setHasLocation] = useState(false);
	const [alert, setAlert] = useState(false);

	const [weatherForecast, setWeatherForecast] = useState<IWeatherForecastRdo>();

	// useEffect(() => {
	// 	navigator.permissions.query({
	// 		name: 'geolocation'
	// 	}).then(function (result) {
	// 		if (result.state === 'denied') {
	// 			setAlert(true);
	// 			return
	// 		} else {
	// 			setAlert(false);
	// 		}
	// 	});

	// 	if (hasLocation) return

	// 	navigator.geolocation.getCurrentPosition(
	// 		async (pos: GeolocationPosition) => {
	// 			setHasLocation(true);
	// 			console.log(pos.coords.latitude, pos.coords.longitude);

	// 			const result = await OpenMeteoAPI.getWeatherForecast(
	// 				new WeatherForecast(
	// 					pos.coords.latitude,
	// 					pos.coords.longitude,
	// 					Temperature.allTemperature,
	// 					DailyDto.sunriseAndSunset
	// 				)
	// 			)
	// 			if (result?.data) {
	// 				console.log(result.data)
	// 				setWeatherForecast(result.data)
	// 			}
	// 		})
	// }, [hasLocation]);

	useEffect(() => {
		console.log(weatherForecast);
	}, [weatherForecast]);

	const getCity = async () => {
		if (!address)
			return
		const response = await YandexGeoAPI.getCoordinates(address)
		console.log('getCity data')

		console.log(response)

		const result = response?.data?.response?.GeoObjectCollection?.featureMember[0].GeoObject.Point.pos.split(' ')
		return result
	}

	const search = async () => {
		console.log('search start');
		console.log(address);

		console.log(`latitude: ${latitude}`);
		console.log(`longitude: ${longitude}`)
		if (!latitude || !longitude) return
		
		const result = await OpenMeteoAPI.getWeatherForecast(
			new WeatherForecast(
				latitude,
				longitude,
				Temperature.allTemperature,
				DailyDto.sunriseAndSunset
			)
		)

		console.log('search data');
		console.log(result);		

		if (result?.data) {
			console.log('search result data');

			console.log(result.data)
			setWeatherForecast(result.data)
		}
	}

	const onSubmit = () => {
		const timeoutId = setTimeout(async () => {
			const pos = await getCity()

			if (!pos) return

			setLatitude(Number(pos[1]))
			setLongitude(Number(pos[0]))
		}, 500);

		return () => clearTimeout(timeoutId);
	}

	useEffect(() => {
		const s = async () => search()
		s()
	}, [longitude, latitude])

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				{
					alert &&
					<Alert
						sx={{ maxWidth: 350 }}
						variant={"soft"}
						color={"danger"}
						startDecorator={<ReportIcon />}
						endDecorator={
							<IconButton onClick={() => setAlert(false)} variant="soft" color={'danger'}>
								<CloseRoundedIcon />
							</IconButton>
						}
					>
						<div>
							<Typography level="body-md">
								Ошибка
							</Typography>
							<Typography level="body-sm" color={"danger"}>
								Необходимо разрешение на определение местоположения
							</Typography>
						</div>
					</Alert>
				}
				<Form
					style={{display: 'flex', justifyContent: 'center', width: '100%'}}
					onSubmit={onSubmit}>
					<Input
						sx={{width:'70%'}}
						placeholder="Населенный пункт"
						onChange={(e) => { setAddress(e.target.value) }}>
						{address}
					</Input>
					<IconButton type="submit">
						<SearchIcon/>
					</IconButton>
				</Form>
				{
					weatherForecast &&
					<>
						<DetailedWeather weatherForecast={weatherForecast}/>
						<WeatherList weatherForecast={weatherForecast} />
					</>
				}
			</Box>
		</>
	)
}

export default App