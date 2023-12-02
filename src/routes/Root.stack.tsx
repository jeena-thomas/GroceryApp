import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackEnum} from '../enums/stackEnums';
import HomeBottomStack from './Home.stack';
import {LazyCartPage, LazyCheckoutPage, LazyProductPage} from './LazyPages';

export type RootStackParamList = {
  home: undefined;
  product: undefined;
  cart: undefined;
  checkout: undefined;
};

const RootStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={StackEnum.HOME}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name={StackEnum.HOME} component={HomeBottomStack} />
      <Stack.Screen name={StackEnum.PRODUCT} component={LazyProductPage} />
      <Stack.Screen name={StackEnum.CART} component={LazyCartPage} />
      <Stack.Screen name={StackEnum.CHECKOUT} component={LazyCheckoutPage} />
    </Stack.Navigator>
  );
};

export default RootStack;
