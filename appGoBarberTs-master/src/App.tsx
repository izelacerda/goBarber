import React, { useEffect } from 'react';
import 'react-native-gesture-handler';

import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import Routes from './routes';
import AppProvider from './hooks/index';

const App: React.FC = () => {
  useEffect(() => {
    // ver se esta logado
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#312e38"
        translucent
      />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#312e38' }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};
export default App;
