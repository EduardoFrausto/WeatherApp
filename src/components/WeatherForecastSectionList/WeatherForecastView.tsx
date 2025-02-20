import React, {FC} from 'react';
import {useAppSelector} from '../../redux/app/hooks.ts';
import {
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {onBackground} from '../../../constants.ts';
import {
  WeatherSectionItem,
  WeatherSectionItemDataItem,
} from '../../models/weather.ts';
import WeatherForecastSectionHeader from './WeatherForecastSectionHeader.tsx';
import WeatherForecastSectionItem from './WeatherForecastSectionItem.tsx';
import LoadingModal from '../LoadingModal.tsx';

const WeatherForecastView: FC<WeatherForecastViewProps> = ({
  containerStyle,
}) => {
  const {weatherSectionList, loadingWeather, selectedCities} = useAppSelector(
    state => state.weatherSlice,
  );

  const renderSectionHeader = (info: {
    section: SectionListData<WeatherSectionItemDataItem, WeatherSectionItem>;
  }) => {
    return <WeatherForecastSectionHeader title={info.section.title} />;
  };

  const renderItem = (
    info: SectionListRenderItemInfo<
      WeatherSectionItemDataItem,
      WeatherSectionItem
    >,
  ) => {
    const isLastItem = info.index === info.section.data.length - 1;
    return (
      <WeatherForecastSectionItem
        date={info.item.date}
        temp_max={info.item.temp_max}
        temp_min={info.item.temp_min}
        isLastItem={isLastItem}
      />
    );
  };

  return (
    <View style={containerStyle}>
      {selectedCities.length === 0 ? (
        <Text style={styles.title}>
          Escribe el nombre de una ciudad para poder consultar el pronostico del
          clima
        </Text>
      ) : (
        <>
          <SectionList
            sections={weatherSectionList}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
            stickySectionHeadersEnabled={false}
          />
        </>
      )}
      <LoadingModal loading={loadingWeather} />
    </View>
  );
};

interface WeatherForecastViewProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  title: {
    color: onBackground,
  },
});

export default WeatherForecastView;
