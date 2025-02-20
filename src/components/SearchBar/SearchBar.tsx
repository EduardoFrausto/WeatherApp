import React, {FC, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import searchIconFunction from '../../assets/icons/searchIcon.ts';
import {
  borderRadius,
  onBackground,
  onSurface,
  surface,
} from '../../../constants.ts';
import {useAppDispatch, useAppSelector} from '../../redux/app/hooks.ts';
import {clearCities, searchCity} from '../../redux/features/weatherSlice.ts';
import CityListItem from './CityListItem.tsx';
import {Place} from '../../models/place.ts';

const searchIcon = searchIconFunction();

const SearchBar: FC = () => {
  const {cities, loadingCities} = useAppSelector(state => state.weatherSlice);

  const [search, setSearch] = useState('');

  const dispatch = useAppDispatch();

  const renderItem = ({item}: {item: Place}) => (
    <CityListItem
      id={item.id}
      state={item.state}
      city_name={item.city_name}
      lat={item.lat}
      long={item.long}
    />
  );

  const onEditingSearchHandler = (text: string) => {
    setSearch(text);
    if (cities.length > 0) {
      dispatch(clearCities());
    }
  };

  const onSearchHandler = () => {
    if (search.trim().length === 0) {
      Alert.alert(
        'Escribe una ciudad',
        'No es posible buscar el clima sin conocer la ciudad',
      );
      return;
    }
    dispatch(searchCity(search));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRowContainer}>
        <TextInput
          style={styles.input}
          keyboardType={'default'}
          enterKeyHint={'search'}
          placeholder={'Busca tu ciudad'}
          placeholderTextColor={onSurface}
          value={search}
          onChangeText={onEditingSearchHandler}
          onSubmitEditing={onSearchHandler}
        />
        {loadingCities ? (
          <ActivityIndicator
            color={Platform.OS === 'android' ? onBackground : undefined}
          />
        ) : (
          <TouchableOpacity
            style={[
              styles.button,
              !search.trim() ? styles.disabled : undefined,
            ]}
            disabled={!search.trim()}
            onPress={onSearchHandler}>
            <SvgXml xml={searchIcon} />
          </TouchableOpacity>
        )}
      </View>
      {cities.length > 0 ? (
        <FlatList
          data={cities}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
    maxHeight: 300,
  },
  searchRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 8,
  },
  button: {
    backgroundColor: surface,
    borderRadius: borderRadius,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: surface,
    padding: 8,
    borderRadius: borderRadius,
  },
  disabled: {
    opacity: 0.4,
  },
  flatListContent: {
    gap: 4,
    paddingHorizontal: 8,
  },
});

export default SearchBar;
