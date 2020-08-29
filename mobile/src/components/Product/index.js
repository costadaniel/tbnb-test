import React from "react";
import {
  Container,
  ProductName,
  ProductDescription,
  ProductPrice,
  ProductQuantity,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Product({ props }) {
  const navigation = useNavigation();

  return (
    <Container
      onPress={() => {
        navigation.navigate("Product", { product: props });
      }}
    >
      <ProductName>{props.name}</ProductName>
      <ProductDescription>{props.description}</ProductDescription>
      <ProductPrice>Price: ${props.price}</ProductPrice>
      <ProductQuantity>In Stock: {props.quantity}</ProductQuantity>
    </Container>
  );
}
