import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {borderRadius, onSurface, surface} from '../../../constants.ts';
import {useAppDispatch} from '../../redux/app/hooks.ts';
import {
  clearCities,
  searchWeather,
  addSelectedCity,
} from '../../redux/features/weatherSlice.ts';

const CityListItem = memo<CityListItemProps>(
  ({city_name, lat, long, state, id}) => {
    const dispatch = useAppDispatch();

    const onSelectCity = () => {
      dispatch(
        addSelectedCity({
          id: id,
          selectedCityName: city_name,
          selectedLatitude: lat,
          selectedLongitude: long,
          selectedCityState: state,
        }),
      );
      dispatch(clearCities());
      dispatch(searchWeather());
    };

    return (
      <TouchableOpacity style={styles.button} onPress={onSelectCity}>
        <Text style={styles.text}>
          {city_name.trim()}, {state.trim()}
        </Text>
      </TouchableOpacity>
    );
  },
);

interface CityListItemProps {
  id: number;
  city_name: string;
  state: string;
  lat: string;
  long: string;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: surface,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: borderRadius,
  },
  text: {
    color: onSurface,
  },
});

export default CityListItem;
