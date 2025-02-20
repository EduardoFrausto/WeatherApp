export interface Place {
  id: number;
  city_name: string;
  state: string;
  country: string;
  lat: string;
  long: string;
  result_type: string;
}

export interface SelectedCity {
  id: number;
  selectedLongitude: string;
  selectedLatitude: string;
  selectedCityName: string;
  selectedCityState: string;
}
