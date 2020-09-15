import React from "react";
import { Alert, DeviceEventEmitter } from "react-native";
import {
  Container,
  ProductName,
  ProductDescription,
  ProductPrice,
  ProductQuantity,
} from "./styles";
import AsyncStorage from "@react-native-community/async-storage";

export default function UpdatedProduct({ props }) {
  async function getStorageProducts() {
    let products;

    try {
      products = await AsyncStorage.getItem("@products");
      return products != null ? JSON.parse(products) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async function removeItem() {
    let products = await getStorageProducts();
    let index = products.findIndex((item) => item.key == props.key);

    if (index > -1) {
      await products.splice(index, 1);
    }

    try {
      const jsonValue = JSON.stringify(products);
      await AsyncStorage.setItem("@products", jsonValue);

      DeviceEventEmitter.emit("getUpdatedProducts");
    } catch (error) {
      console.log(error);
    }
  }

  function handleOnPress() {
    Alert.alert(
      "Attention",
      `You want to remove this item from update queue?`,
      [
        {
          text: "No",
          onPress: () => null,
        },
        {
          text: "Yes",
          onPress: () => removeItem(),
        },
      ]
    );
  }

  return (
    <Container onPress={() => handleOnPress()}>
      <ProductName>{props.name}</ProductName>
      <ProductDescription>{props.description}</ProductDescription>
      <ProductPrice>Price: ${props.price}</ProductPrice>
      <ProductQuantity>In Stock: {props.quantity}</ProductQuantity>
    </Container>
  );
}
