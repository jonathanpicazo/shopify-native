import { View, Image, Text } from "react-native";
import { useEffect, useState } from "react";
import Collection from "../components/collection";
import { collectionByHandle } from "../utils/queries";
import { NavigationProp } from "@react-navigation/native";

const CollectionScreen = ({ navigation }) => {
  const [allProducts, setAllProducts] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const shopName = "suavedev.myshopify.com";
        const url = new URL(`https://${shopName}/api/2021-07/graphql`);
        const storefrontToken = "56e368aa9a0de5daf9f70012daf70d7b";
        const query = collectionByHandle;
        const variables = {
          handle: "mens-hair",
        };
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": storefrontToken,
          },
          body: JSON.stringify({ query, variables }),
        };
        const res = await fetch(url, options);
        const resJson = await res.json();
        const products = resJson.data.collection.products.edges;
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
        <Collection products={allProducts} navigation={navigation} />
      )}
    </View>
  );
};

export default CollectionScreen;
