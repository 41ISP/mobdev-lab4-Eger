import {useEffect, useState} from "react";
import {Alert, Box, IconButton, Typography} from "@mui/joy";
import ReportIcon from '@mui/icons-material/Report';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import OpenMeteoAPI from "./shared/api/api.ts";
import {DailyDto, Temperature, WeatherForecast} from "./shared/api/api.dto.ts";
import {IWeatherForecastRdo} from "./shared/api/api.rdo.ts";

function App() {
	const [hasLocation, setHasLocation] = useState(false);
	const [alert, setAlert] = useState(false);

	const [weatherForecast, setWeatherForecast] = useState<IWeatherForecastRdo>();

	useEffect(() => {
		navigator.permissions.query({
			name: 'geolocation'
		}).then(function (result) {
			if (result.state === 'denied') {
				setAlert(true);
				return
			} else {
				setAlert(false);
			}
		});

		if (hasLocation) return

		navigator.geolocation.getCurrentPosition(
			async (pos: GeolocationPosition) => {
				setHasLocation(true);
				console.log(pos.coords.latitude, pos.coords.longitude);

				const result = await OpenMeteoAPI.getWeatherForecast(
					new WeatherForecast(
						pos.coords.latitude,
						pos.coords.longitude,
						Temperature.allTemperature,
						DailyDto.sunriseAndSunset
					)
				)
				if (result?.data) {
					console.log(result.data)
					setWeatherForecast(result.data)
				}
			})
	}, [hasLocation]);

	useEffect(() => {
		console.log(weatherForecast);
	}, [weatherForecast]);

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
                        sx={{maxWidth: 350}}
                        variant={"soft"}
                        color={"danger"}
                        startDecorator={<ReportIcon/>}
                        endDecorator={
							<IconButton onClick={() => setAlert(false)} variant="soft" color={'danger'}>
								<CloseRoundedIcon/>
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
			</Box>
			{
				weatherForecast &&
				<>
					
				</>
			}
		</>
	)
}

export default App