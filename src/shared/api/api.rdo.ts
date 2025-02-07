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
	wind_speed_10m: number[];
}

export interface IHourlyUnits {
	time: string;
	temperature_2m: string;
	apparent_temperature: string;
	wind_speed_10m: string;
}

export interface IResponse {
	response: IYaGeoResponse
}

export interface IYaGeoResponse {
	GeoObjectCollection: GeoObjectCollection;
}

export interface GeoObjectCollection {
	metaDataProperty: MetaDataProperty;
	featureMember: FeatureMember[];
}

export interface FeatureMember {
	GeoObject: GeoObject;
}

export interface GeoObject {
	metaDataProperty: MetaDataProperty2;
	name: string;
	description: string;
	boundedBy: BoundedBy;
	uri: string;
	Point: Point;
}

export interface Point {
	pos: string;
}

export interface BoundedBy {
	Envelope: Envelope;
}

export interface Envelope {
	lowerCorner: string;
	upperCorner: string;
}

export interface MetaDataProperty2 {
	GeocoderMetaData: GeocoderMetaData;
	ReferencesMetaData?: ReferencesMetaData;
}

export interface ReferencesMetaData {
	references: Reference[];
}

export interface Reference {
	id: string;
	scope: string;
}

export interface GeocoderMetaData {
	precision: string;
	text: string;
	kind: string;
	Address: Address;
	AddressDetails: AddressDetails;
}

export interface AddressDetails {
	Country: Country2;
}

export interface Country2 {
	AddressLine: string;
	CountryNameCode: string;
	CountryName: string;
	AdministrativeArea?: AdministrativeArea;
	Thoroughfare?: Thoroughfare;
	Country?: Country;
}

export interface Country {
	Locality: Locality3;
}

export interface Locality3 {
}

export interface AdministrativeArea {
	AdministrativeAreaName: string;
	SubAdministrativeArea?: SubAdministrativeArea;
	Locality?: Locality2;
}

export interface Locality2 {
	DependentLocality?: DependentLocality2;
	Thoroughfare?: Thoroughfare;
}

export interface DependentLocality2 {
	DependentLocalityName: string;
}

export interface SubAdministrativeArea {
	SubAdministrativeAreaName: string;
	Locality: Locality;
}

export interface Locality {
	LocalityName?: string;
	DependentLocality?: DependentLocality;
	Thoroughfare?: Thoroughfare;
	Premise?: Premise;
}

export interface Thoroughfare {
	ThoroughfareName: string;
}

export interface DependentLocality {
	DependentLocalityName: string;
	Premise?: Premise;
}

export interface Premise {
	PremiseName: string;
}

export interface Address {
	country_code: string;
	formatted: string;
	Components: Component[];
}

export interface Component {
	kind: string;
	name: string;
}

export interface MetaDataProperty {
	GeocoderResponseMetaData: GeocoderResponseMetaData;
}

export interface GeocoderResponseMetaData {
	request: string;
	results: string;
	found: string;
}