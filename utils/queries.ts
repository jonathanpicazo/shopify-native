export const collectionByHandle = `
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
            featuredImage {
              id
              src
            }
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  image {
                    id
                    src
                  }
                  priceV2 {
                    amount
                  }
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const productByHandle = ``;
