import React, { useState, useEffect } from "react";
import { DeviceEventEmitter } from "react-native";
import {
  Container,
  Header,
  ProductAtt,
  AttInput,
  FormButton,
  ErrorText,
} from "./styles";
import ProductHistory from "../../components/ProductHistory";

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

  async function handleDelete() {
    try {
      await api.delete("/" + product.id);

      DeviceEventEmitter.emit("getProducts");
      navigation.navigate("Products");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate() {
    try {
      await api.put("/" + product.id, {
        name: name,
        description: description,
        price: price,
        quantity: quantity,
      });
    } catch (error) {
      console.log(error);
    }
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
    <Container>
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
        {validQuantity ? "" : "Required. Numeric bigger than or equal to 0."}
      </ErrorText>
      <AttInput
        onChangeText={(text) => handleQuantityInput(text)}
        value={String(quantity) === "NaN" ? "" : String(quantity)}
        keyboardType="numeric"
      />

      <FormButton
        title="Update Product"
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
