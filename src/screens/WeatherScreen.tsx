import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import SearchBar from '../components/SearchBar/SearchBar.tsx';
import {background, onBackground} from '../../constants.ts';
import WeatherForecastView from '../components/WeatherForecastSectionList/WeatherForecastView.tsx';
import SelectedCitiesList from '../components/SelectedCitiesList/SelectedCitiesList.tsx';

const WeatherScreen: FC = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <SearchBar />
        <SelectedCitiesList />
        <WeatherForecastView containerStyle={styles.weatherContent} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: background,
  },
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 16,
  },
  text: {
    color: onBackground,
  },
  weatherContent: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default WeatherScreen;
