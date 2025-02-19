import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {borderRadius, onSurface, surface} from '../../constants.ts';
import {useAppDispatch} from '../redux/app/hooks.ts';
import {clearCities, setSelectedCity} from '../redux/features/weatherSlice.ts';

const CityListItem = memo<CityListItemProps>(
  ({city_name, lat, long, state}) => {
    const dispatch = useAppDispatch();

    const onSelectCity = () => {
      dispatch(
        setSelectedCity({
          selectedCityName: city_name,
          selectedLatitude: lat,
          selectedLongitude: long,
        }),
      );
      dispatch(clearCities());
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
