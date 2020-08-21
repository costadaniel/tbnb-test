import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProductList from "../../components/ProductList";

const Stack = createStackNavigator();

export default function ProductScreen() {
  return (
    <Stack.Navigator initialRouteName="ProductListScreen">
      <Stack.Screen name="ProductListScreen" component={ProductList} />
    </Stack.Navigator>
  );
}
