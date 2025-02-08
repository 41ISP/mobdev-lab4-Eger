import {List, ListItem, ListItemButton, ListItemContent, Sheet, Table} from "@mui/joy";
import dateFormat, {i18n} from "dateformat"
import monthNames from "../../shared/dateLocalization.ts";
import {IWeatherListProps} from "../../shared/props.ts";

const WeatherList = (props: IWeatherListProps) => {

	i18n.monthNames = monthNames

	const items: JSX.Element[] = [
		<ListItem key={0}>
			<ListItemButton>
				<Sheet
					variant="soft">
					<Table>
						<thead>
						<tr>
							<th>
								Дата
							</th>
							<th>
								Время
							</th>
							<th>
								Температура
							</th>
							<th>
								Ощущается как
							</th>
						</tr>
						</thead>
					</Table>
				</Sheet>
			</ListItemButton>
		</ListItem>
	]

	for (let i = 0; i < props.weatherForecast.hourly.time.length; i++) {
		const timeItem = props.weatherForecast.hourly.time[i]
		const date = new Date(timeItem)
		const now = new Date(Date.now())
		const now1 = now.setHours(now.getHours() == 0 ? 1 : now.getHours())
		if(date < new Date(now1)) continue

		const temperatureItem = props.weatherForecast.hourly.temperature_2m[i]
		const apparentTemperatureItem = props.weatherForecast.hourly.apparent_temperature[i]


		items.push(
			<ListItem key={i+1}>
				<ListItemButton>
					{
						<Sheet style={{borderRadius: '0.5rem'}}>
							<Table>
								<tbody>
									<tr>
										<td>
											<ListItemContent>
												{
													dateFormat(date, 'HH:MM') == '00:00' ?
														dateFormat(date, 'dd mmm')
														:
														''
												}

											</ListItemContent>
										</td>
										<td>
											<ListItemContent>
												{dateFormat(date, 'HH:MM')}
											</ListItemContent>
										</td>
										<td>
											<ListItemContent>
												{temperatureItem}
											</ListItemContent>
										</td>
										<td>
											<ListItemContent>
												{apparentTemperatureItem}
											</ListItemContent>
										</td>
									</tr>
								</tbody>
							</Table>
						</Sheet>
					}
				</ListItemButton>
			</ListItem>
		)
	}

	return (
		<List
			variant={'outlined'}
			sx={{"--List-radius": "10px", margin: '1rem'}}>
			{items}
		</List>
	)
}

export default WeatherList