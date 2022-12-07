import React from "react";
import { View, Image, Text } from "react-native";

const CartTab = () => {
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{
            uri: "https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-logo-full_bf2605b5-794c-4e7b-acfd-96518ed0286b.png?v=1630549747",
          }}
        />
        <Text>Cart is empty</Text>
      </View>
    </>
  );
};

export default CartTab;
