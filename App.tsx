import React from 'react';
import WeatherScreen from './src/screens/WeatherScreen.tsx';
import {Provider} from 'react-redux';
import {store} from './src/redux/app/store.ts';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <WeatherScreen />
    </Provider>
  );
}

export default App;
