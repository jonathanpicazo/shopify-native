import { View, Image, Text } from "react-native";
import { useEffect, useState } from "react";
import Collection from "./collection";
const Home = () => {
  const [allProducts, setAllProducts] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const shopName = "suavedev.myshopify.com";
        const url = new URL(`https://${shopName}/api/2021-07/graphql`);
        const storefrontToken = "56e368aa9a0de5daf9f70012daf70d7b";
        const query = `
          query getCollectionByHandle($handle: String!){
            collection(handle: $handle) {
              products(first: 10) {
                edges {
                  node {
                    id
                    title
                    priceRange {
                      minVariantPrice {
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
      `;
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
        console.log(JSON.stringify(res, null, 4));
        const resJson = await res.json();
        console.log("resJson", resJson);
        const products = resJson.data.collection.products.edges;
        console.log("products", products);
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
      <Image
        source={{
          uri: "https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-logo-full_bf2605b5-794c-4e7b-acfd-96518ed0286b.png?v=1630549747",
        }}
      />
      {!allProducts ? (
        <Text>Home Screen</Text>
      ) : (
        <Collection products={allProducts} />
      )}
    </View>
  );
};
export default Home;
