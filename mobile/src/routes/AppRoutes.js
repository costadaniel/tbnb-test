import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CreateProductScreen from "../screens/CreateProductScreen";
import ProductRoute from "./ProductRoute";

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{ showLabel: false }}>
        <Tab.Screen
          name="Products"
          component={ProductRoute}
          options={{
            tabBarIcon: () => <Feather name="home" size={24} color="black" />,
          }}
        />
        <Tab.Screen
          name="CreateProductScreen"
          component={CreateProductScreen}
          options={{
            tabBarIcon: () => (
              <Feather name="file-plus" size={24} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
