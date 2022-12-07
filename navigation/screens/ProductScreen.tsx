import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
const ProductScreen = ({ navigation, route }) => {
  const destructureProduct = (product) => {
    const { node } = product;
    return node;
  };
  const { product } = route.params;
  const [selectedVariant, setSelectedVariant] = useState(
    destructureProduct(product.variants.edges[0])
  );
  console.log("on product", product);
  console.log("show Picker", product.variants.edges.length > 1);
  const addToCart = (variant) => {
    console.log("add to cart", variant);
  };
  return (
    <>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Image
            source={{ uri: selectedVariant.image.src }}
            style={styles.image}
          />
          <Text>{product.title}</Text>
          {selectedVariant.title !== "Default Title" && (
            <Text>{selectedVariant.title}</Text>
          )}
          <Text>{selectedVariant.priceV2.amount}</Text>
          {product.variants.edges.length > 1 && (
            <Picker
              selectedValue={selectedVariant}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedVariant(itemValue)
              }
            >
              {product.variants.edges.map((_variant) => (
                <Picker.Item
                  label={_variant.node.title}
                  value={_variant.node}
                />
              ))}
            </Picker>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => addToCart(selectedVariant)}
          >
            <Text style={styles.buttonText}>Add to cart</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 250,
    width: 250,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#802A19",
    borderRadius: 2,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
  },
});

export default ProductScreen;
