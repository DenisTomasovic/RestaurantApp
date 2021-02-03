import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './src/screens/main_screen';
import SearchResult from './src/screens/search_result_screen';
import RestaurantScreen from './src/screens/restaurant_screen';
import RestaurantDetail from './src/screens/restaurant_detail';

export default function App() {

  const Stack = createStackNavigator()
  const stackOptionStyle = {
    headerStyle: {
      backgroundColor: '#fcba00'
    },
    headerTitleStyle: {
      color: '#fff',
    },
    headerTransparent: true,
  }

  const detailsOptionStyle = {
    headerTransparent: true,
    headerTitle: false,
    headerTintColor: '#fff'
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' />
      <Stack.Navigator>
        <Stack.Screen name='RestaurantApp' component={MainScreen} options={stackOptionStyle} />
        <Stack.Screen name='Select city' component={SearchResult} />
        <Stack.Screen name='All restaurants' component={RestaurantScreen} />
        <Stack.Screen name='Details' component={RestaurantDetail} options={detailsOptionStyle} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}