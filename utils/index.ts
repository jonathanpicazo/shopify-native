import { SHOPIFY_MY_SHOPIFY, SHOPIFY_STOREFRONT_TOKEN } from "@env";
export const fetchStorefront = async (query: string, variables?: any) => {
  try {
    const url = new URL(`https://${SHOPIFY_MY_SHOPIFY}/api/2022-10/graphql`);
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    };
    const res = await fetch(url, options);
    const resJson = await res.json();
    return resJson.data;
  } catch (error) {
    console.log("error while fetching products", error);
  }
};
