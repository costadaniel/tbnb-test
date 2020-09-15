import React, { useState } from "react";
import { Alert, DeviceEventEmitter } from "react-native";
import {
  Container,
  Header,
  ProductAtt,
  AttInput,
  FormButton,
  ErrorText,
} from "./styles";

import { api } from "../../services/api";

export default function ProductCreationForm() {
  const [name, onChangeName] = useState("");
  const [description, onChangeDescription] = useState("");
  const [price, onChangePrice] = useState("");
  const [quantity, onChangeQuantity] = useState("");
  const [validName, setValidName] = useState(false);
  const [validDescription, setValidDescription] = useState(false);
  const [validPrice, setValidPrice] = useState(false);
  const [validQuantity, setValidQuantity] = useState(false);

  async function handleCreation() {
    try {
      await api.post("/", {
        name: name,
        description: description,
        price: price,
        quantity: quantity,
      });

      Alert.alert("Product Created", `Product ${name} created`, [
        {
          text: "Ok",
          onPress: () => {
            onChangeName("");
            onChangeDescription("");
            onChangePrice("");
            onChangeQuantity("");
            setValidName(false);
            setValidDescription(false);
            setValidPrice(false);
            setValidQuantity(false);
          },
        },
      ]);
    } catch (error) {
      console.log(error.response);
    }

    DeviceEventEmitter.emit("getProducts");
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

  return (
    <Container>
      <Header>Create Product</Header>
      <ProductAtt>Product Name</ProductAtt>
      <ErrorText>{validName ? "" : "Required"}</ErrorText>
      <AttInput onChangeText={(text) => handleNameInput(text)} value={name} />

      <ProductAtt>Product Description</ProductAtt>
      <ErrorText>{validDescription ? "" : "Required"}</ErrorText>
      <AttInput
        onChangeText={(text) => handleDescriptionInput(text)}
        value={description}
      />

      <ProductAtt>Product Price</ProductAtt>
      <ErrorText>
        {validPrice ? "" : "Required. Numeric bigger than or equal to 0."}
      </ErrorText>
      <AttInput
        onChangeText={(text) => handlePriceInput(text)}
        value={String(price)}
        keyboardType="numeric"
      />

      <ProductAtt>Product Quantity</ProductAtt>
      <ErrorText>
        {validQuantity ? "" : "Required. Numeric bigger than or equal to 0."}
      </ErrorText>
      <AttInput
        onChangeText={(text) => handleQuantityInput(text)}
        value={String(quantity) === "NaN" ? "" : String(quantity)}
        keyboardType="numeric"
      />

      <FormButton
        title="Create Product"
        onPress={() => handleCreation()}
        disabled={
          !(validName && validDescription && validQuantity && validPrice)
        }
      />
    </Container>
  );
}
