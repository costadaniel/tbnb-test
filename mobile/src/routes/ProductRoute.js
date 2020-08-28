import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProductListScreen from "../screens/ProductListScreen";
import ProductScreen from "../screens/ProductScreen";

const Stack = createStackNavigator();

export default function ProductRoute() {
  return (
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen name="Products" component={ProductListScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
}
