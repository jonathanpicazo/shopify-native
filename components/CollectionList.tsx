import React from "react";
import {
  Text,
  FlatList,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
const CollectionList = ({
  route,
  navigation,
  products,
}: {
  route?: any;
  navigation: any;
  products: any;
}) => {
  const Product = ({
    title,
    price,
    id,
    item,
  }: {
    title: string;
    price: string;
    id: string;
    item: any;
  }) => {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity
          onPress={() => {
            navigation.push("Product", {
              product: item,
            });
          }}
        >
          <Text>{title}</Text>
          <Text>starts from: ${price} USD</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderProduct = ({ item }) => {
    return (
      <Product
        title={item.node.title}
        price={item.node.priceRange.minVariantPrice.amount}
        id={item.node.id}
        key={item.node.id}
        item={item.node}
      />
    );
  };

  const styles = StyleSheet.create({
    listItem: {
      marginBottom: 10,
    },
    list: {
      marginVertical: 10,
    },
  });
  return (
    <>
      <SafeAreaView>
        <FlatList
          style={styles.list}
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.node.id}
        ></FlatList>
      </SafeAreaView>
    </>
  );
};

export default CollectionList;
