import { useContext, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ListViewBase,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { CartContext } from "../../contexts/CartContext";
import { CheckoutScreen } from "../screens";

const CartItem = ({ item }) => {
  const renderTitle = (variant) => {
    if (variant.title !== "Default Title") {
      return `${variant.product.title} - ${variant.title}`;
    }
    return variant.product.title;
  };
  return (
    <View style={styles.listItem}>
      <Text>{item.quantity}</Text>
      <View style={styles.itemRight}>
        <Text numberOfLines={1} style={styles.title}>
          {renderTitle(item.shopifyVariant)}
        </Text>
        <Text>{item.shopifyVariant.priceV2.amount}</Text>
      </View>
    </View>
  );
};

const CartTab = () => {
  const [count, setCount] = useState(0);
  const { checkout } = useContext(CartContext);

  const renderItem = (listItem) => {
    return <CartItem item={listItem.item} />;
  };

  useEffect(() => {
    console.log("current checkout is", checkout.lineItems.length, "items long");
  }, [checkout]);

  useEffect(() => {
    console.log("cart page");
    setCount(count + 1);
  }, []);

  useFocusEffect(() => {
    console.log("focused");
  });

  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {!checkout || checkout.lineItems.length === 0 ? (
          <Text>Cart is empty</Text>
        ) : (
          <>
            <SafeAreaView>
              <FlatList
                style={styles.list}
                data={checkout.lineItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.shopifyVariant.id}
              ></FlatList>
              <CheckoutScreen />
            </SafeAreaView>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  listItem: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  list: {
    marginVertical: 10,
  },
  itemRight: {
    marginLeft: 100,
  },
  title: {},
});
export default CartTab;
