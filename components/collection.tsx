import React from "react";
import { Text } from "react-native";
const Collection = ({ products }) => {
  return (
    <>
      {products.map((el) => (
        <Text>{el.node.title}</Text>
      ))}
    </>
  );
};

export default Collection;
