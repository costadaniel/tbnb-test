import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CreateProductScreen from "../screens/CreateProductScreen";
import ProductRoute from "./ProductRoute";

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Products" component={ProductRoute} />
        <Tab.Screen
          name="CreateProductScreen"
          component={CreateProductScreen}
        />
      </Tab.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
