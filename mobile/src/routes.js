import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CreateProductScreen from "./screens/CreateProductScreen";
import ProductsScreen from "./screens/ProductsScreen";

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Products" component={ProductsScreen} />
        <Tab.Screen
          name="CreateProductScreen"
          component={CreateProductScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
