import { useState, useEffect, useContext } from "react";
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
import { CartContext } from "../../contexts/CartContext";

const ProductScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const destructureProduct = (product: any) => {
    const { node } = product;
    return node;
  };
  const { product } = route.params;
  const [selectedVariant, setSelectedVariant] = useState(
    destructureProduct(product.variants.edges[0])
  );
  const { addProductToCart } = useContext(CartContext);
  const addToCart = (variant: any) => {
    console.log("add to cart", variant);
    addProductToCart(variant);
  };
  return (
    <>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Image
            source={{ uri: selectedVariant.image.src }}
            style={styles.image}
            resizeMode={"contain"}
          />
          <Text>{product.title}</Text>
          {selectedVariant.title !== "Default Title" && (
            <Text>{selectedVariant.title}</Text>
          )}
          <Text>{selectedVariant.priceV2.amount}</Text>
          {/* {product.variants.edges.length > 1 && (
            <Picker
              style={styles.picker}
              selectedValue={selectedVariant}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedVariant(itemValue)
              }
            >
              {product.variants.edges.map((_variant) => (
                <Picker.Item
                  label={_variant.node.title}
                  value={_variant.node}
                  key={_variant.node.id}
                />
              ))}
            </Picker>
          )} */}
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
  picker: {
    width: 200,
    fontSize: 10,
  },
});

export default ProductScreen;
