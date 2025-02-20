import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../redux/app/hooks.ts';
import {SelectedCity} from '../../models/place.ts';
import SelectedCityListItem from './SelectedCityListItem.tsx';

const SelectedCitiesList: FC = () => {
  const {selectedCities} = useAppSelector(state => state.weatherSlice);

  const renderItem = ({item}: {item: SelectedCity}) => {
    return (
      <SelectedCityListItem
        id={item.id}
        selectedCityName={item.selectedCityName}
        selectedCityState={item.selectedCityState}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={selectedCities}
        horizontal={true}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 4,
  },
});

export default SelectedCitiesList;
