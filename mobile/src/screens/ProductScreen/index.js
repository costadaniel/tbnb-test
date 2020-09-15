import React, { useState, useEffect } from "react";
import { Alert, DeviceEventEmitter } from "react-native";
import {
  Container,
  Header,
  ProductAtt,
  AttInput,
  FormButton,
  ErrorText,
} from "./styles";
import ProductHistory from "../../components/ProductHistory";

import AsyncStorage from "@react-native-community/async-storage";
import { api } from "../../services/api";

export default function ProductScreen({ navigation, route }) {
  const { product } = route.params;

  const [productHistory, setProductHistory] = useState([]);
  const [name, onChangeName] = useState(product.name);
  const [description, onChangeDescription] = useState(product.description);
  const [price, onChangePrice] = useState(product.price);
  const [quantity, onChangeQuantity] = useState(product.quantity);
  const [validName, setValidName] = useState(true);
  const [validDescription, setValidDescription] = useState(true);
  const [validPrice, setValidPrice] = useState(true);
  const [validQuantity, setValidQuantity] = useState(true);

  async function getProductHistory() {
    try {
      const { data } = await api.get("/history/" + product.id);
      setProductHistory(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct() {
    try {
      await api.delete("/" + product.id);

      DeviceEventEmitter.emit("getProducts");
      navigation.navigate("Products");
    } catch (error) {
      console.log(error);
    }
  }

  function handleDelete() {
    Alert.alert("Attention", `You want to delete the product ${name}?`, [
      {
        text: "No",
        onPress: () => null,
      },
      {
        text: "Yes",
        onPress: () => deleteProduct(),
      },
    ]);
  }

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

  async function addProductToUpdateQueue() {
    let products = await getStorageProducts();

    await products.push({
      key: products.length,
      id: product.id,
      name: name,
      description: description,
      price: price,
      quantity: quantity,
    });

    try {
      const jsonValue = JSON.stringify(products);
      await AsyncStorage.setItem("@products", jsonValue);

      DeviceEventEmitter.emit("getUpdatedProducts");
      navigation.navigate("Products");
    } catch (error) {
      console.log(error);
    }
  }

  function handleUpdate() {
    Alert.alert(
      "Attention",
      `You want to add the product ${name} to the update queue?`,
      [
        {
          text: "No",
          onPress: () => null,
        },
        {
          text: "Yes",
          onPress: () => addProductToUpdateQueue(),
        },
      ]
    );
  }

  function handleNameInput(name) {
    name.length > 0 ? setValidName(true) : setValidName(false);
    onChangeName(name);
  }

  function handleDescriptionInput(description) {
    description.length > 0
      ? setValidDescription(true)
      : setValidDescription(false);
    onChangeDescription(description);
  }

  function handlePriceInput(price) {
    !isNaN(price) && price > -1 && price !== "" && price !== null
      ? setValidPrice(true)
      : setValidPrice(false);
    onChangePrice(price);
  }

  function handleQuantityInput(quantity) {
    !isNaN(quantity) && quantity > -1 && quantity !== "" && quantity !== null
      ? setValidQuantity(true)
      : setValidQuantity(false);
    onChangeQuantity(parseInt(quantity));
  }

  useEffect(() => {
    getProductHistory();
  }, []);

  return (
    <Container contentContainerStyle={{ paddingVertical: 20 }}>
      <Header>Product Details</Header>

      <ProductAtt>Product name</ProductAtt>
      <ErrorText>{validName ? "" : "Required"}</ErrorText>
      <AttInput onChangeText={(text) => handleNameInput(text)} value={name} />

      <ProductAtt>Product description</ProductAtt>
      <ErrorText>{validDescription ? "" : "Required"}</ErrorText>
      <AttInput
        onChangeText={(text) => handleDescriptionInput(text)}
        value={description}
      />

      <ProductAtt>Product price</ProductAtt>
      <ErrorText>
        {validPrice ? "" : "Required. Numeric bigger than or equal to 0."}
      </ErrorText>
      <AttInput
        onChangeText={(text) => handlePriceInput(text)}
        value={String(price)}
        keyboardType="numeric"
      />

      <ProductAtt>Product quantity</ProductAtt>
      <ErrorText>
        {validQuantity ? "" : "Required. Integer bigger than or equal to 0."}
      </ErrorText>
      <AttInput
        onChangeText={(text) => handleQuantityInput(text)}
        value={String(quantity) === "NaN" ? "" : String(quantity)}
        keyboardType="numeric"
      />

      <FormButton
        title="Add Product to Update Queue"
        onPress={() => handleUpdate()}
        disabled={
          !(validName && validDescription && validQuantity && validPrice)
        }
      />

      <Header>Product Update History</Header>

      {productHistory.map((element) => (
        <ProductHistory props={element} key={element.id} />
      ))}

      <Header>Delete Product</Header>
      <FormButton title="Delete Product" onPress={() => handleDelete()} />
    </Container>
  );
}
