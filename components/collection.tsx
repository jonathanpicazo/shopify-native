import React from "react";
import { Text, FlatList, View, SafeAreaView } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
const Collection = ({ products }) => {
  const tailwind = useTailwind();

  const Product = ({ title, price }: { title: string; price: string }) => (
    <View style={tailwind("items-center")}>
      <Text>{title}</Text>
      <Text>starts from: ${price} USD</Text>
    </View>
  );

  const renderProduct = ({ item }) => {
    return (
      <Product
        title={item.node.title}
        price={item.node.priceRange.minVariantPrice.amount}
        key={item.node.id}
      />
    );
  };
  return (
    <>
      <SafeAreaView>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.node.id}
        ></FlatList>
      </SafeAreaView>
    </>
  );
};

export default Collection;
