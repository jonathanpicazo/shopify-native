import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
const ProductScreen = ({ navigation, route }) => {
  const { product } = route.params;
  console.log("product", product);
  const [selectedVariant, setSelectedVariant] = useState();
  return (
    <>
      <View style={styles.container}>
        <Text>{product.title}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ProductScreen;
