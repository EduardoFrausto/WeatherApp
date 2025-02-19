import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import SearchBar from '../components/SearchBar.tsx';
import {background, onBackground} from '../../constants.ts';
import {useAppSelector} from '../redux/app/hooks.ts';

const WeatherScreen: FC = () => {
  const {selectedCityName} = useAppSelector(state => state.weatherSlice);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <SearchBar />
        <Text style={styles.text}>{selectedCityName}</Text>
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 16,
  },
  text: {
    color: onBackground,
  },
});

export default WeatherScreen;
