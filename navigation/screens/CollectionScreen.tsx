import { View, Image, Text } from "react-native";
import { useEffect, useState } from "react";
import { CollectionList } from "../../components";
import { collectionByHandle } from "../../utils/queries";
import { NavigationProp } from "@react-navigation/native";
import { fetchStorefront } from "../../utils";
const CollectionScreen = ({ navigation }) => {
  const [allProducts, setAllProducts] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const variables = {
          handle: "mens-hair",
        };
        const res = await fetchStorefront(collectionByHandle, variables);
        const products = res.collection.products.edges;
        return products;
      } catch (error) {
        console.log("error while fetching products", error);
      }
    };

    const getAllProducts = async () => {
      const res = await fetchProducts();
      setAllProducts(res);
    };

    if (!allProducts) {
      getAllProducts();
    }
  }, [allProducts]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {!allProducts ? (
        <Text>Loading</Text>
      ) : (
        <CollectionList products={allProducts} navigation={navigation} />
      )}
    </View>
  );
};

export default CollectionScreen;
