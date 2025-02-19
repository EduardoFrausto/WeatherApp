import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {FC} from 'react';

const WeatherScreen: FC = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.text}>WeatherApp</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
});

export default WeatherScreen;
