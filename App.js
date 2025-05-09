import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import FuelScreen from './screens/FuelScreen';
import PredictScreen from './screens/PredictScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
        <Stack.Screen name="Fuel" component={FuelScreen} options={{ title: 'Giá xăng hôm nay' }} />
        <Stack.Screen name="Predict" component={PredictScreen} options={{ title: 'Dự báo giá xăng' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
