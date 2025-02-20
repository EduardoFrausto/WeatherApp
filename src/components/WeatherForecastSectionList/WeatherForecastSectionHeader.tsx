import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {borderRadius, onSurface, surface} from '../../../constants.ts';

const WeatherForecastSectionHeader = memo<WeatherForecastSectionHeaderProps>(
  ({title}) => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    );
  },
);

interface WeatherForecastSectionHeaderProps {
  title: string;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: surface,
    borderTopEndRadius: borderRadius,
    borderTopStartRadius: borderRadius,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    color: onSurface,
  },
});

export default WeatherForecastSectionHeader;
