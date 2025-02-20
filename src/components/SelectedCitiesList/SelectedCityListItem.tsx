import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {borderRadius, onSurface, surface} from '../../../constants.ts';
import {SvgXml} from 'react-native-svg';
import closeIconFunction from '../../assets/icons/closeIcon.ts';
import {useAppDispatch} from '../../redux/app/hooks.ts';
import {
  removeSelectedCity,
  searchWeather,
} from '../../redux/features/weatherSlice.ts';

const closeIcon = closeIconFunction();

const SelectedCityListItem = memo<SelectedCityListItemProps>(
  ({id, selectedCityName, selectedCityState}) => {
    const dispatch = useAppDispatch();

    const removeSelectedCityHandler = () => {
      dispatch(removeSelectedCity(id));
      dispatch(searchWeather());
    };

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {selectedCityName}, {selectedCityState}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={removeSelectedCityHandler}>
          <SvgXml xml={closeIcon} height={18} width={18} />
        </TouchableOpacity>
      </View>
    );
  },
);

interface SelectedCityListItemProps {
  id: number;
  selectedCityName: string;
  selectedCityState: string;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius,
    gap: 4,
  },
  text: {
    color: onSurface,
  },
  button: {
    padding: 2,
    borderRadius: 20,
  },
});

export default SelectedCityListItem;
