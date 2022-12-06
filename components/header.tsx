import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./home";

const Header = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="Wholesale" component={Home} />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "150",
    height: "150",
  },
});
export default Header;
