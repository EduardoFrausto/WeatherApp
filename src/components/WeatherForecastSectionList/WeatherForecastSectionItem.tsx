import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {WeatherSectionItemDataItem} from '../../models/weather.ts';
import {borderRadius, onSurface, surface} from '../../../constants.ts';

const WeatherForecastSectionItem = memo<WeatherForecastSectionItemProps>(
  ({temp_min, temp_max, date, isLastItem = false}) => {
    return (
      <View
        style={[
          styles.container,
          isLastItem ? styles.bottomBorderRadius : undefined,
        ]}>
        <Text style={styles.timeText}>{date}</Text>
        <View>
          <Text>Minima</Text>
          <Text>{temp_min} °C</Text>
        </View>
        <View>
          <Text>Maxima</Text>
          <Text>{temp_max} °C</Text>
        </View>
      </View>
    );
  },
);

interface WeatherForecastSectionItemProps extends WeatherSectionItemDataItem {
  isLastItem?: boolean;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: surface,
    paddingHorizontal: 8,
    paddingBottom: 8,
    gap: 4,
  },
  bottomBorderRadius: {
    borderBottomEndRadius: borderRadius,
    borderBottomStartRadius: borderRadius,
  },
  timeText: {
    textAlign: 'center',
    color: onSurface,
  },
  temperaturesRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  divider: {
    height: '100%',
    width: 1,
    borderRadius: 8,
    backgroundColor: onSurface,
  },
});

export default WeatherForecastSectionItem;
