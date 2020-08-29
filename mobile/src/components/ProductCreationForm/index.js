import React, { useState } from "react";
import { Container, Header, ProductAtt, AttInput, FormButton } from "./styles";

import { api } from "../../services/api";

export default function ProductCreationForm() {
  const [name, onChangeName] = useState({});
  const [description, onChangeDescription] = useState({});
  const [price, onChangePrice] = useState({});
  const [quantity, onChangeQuantity] = useState({});

  async function handleCreation() {
    try {
      await api.post("/", {
        data: [
          {
            name: name,
            description: description,
            price: price,
            quantity: quantity,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Header>Create Product</Header>
      <ProductAtt>Product Name</ProductAtt>
      <AttInput onChangeText={(text) => onChangeName(text)} />
      <ProductAtt>Product Description</ProductAtt>
      <AttInput onChangeText={(text) => onChangeDescription(text)} />
      <ProductAtt>Product Price</ProductAtt>
      <AttInput
        onChangeText={(text) => onChangePrice(text)}
        keyboardType="numeric"
      />
      <ProductAtt>Product Quantity</ProductAtt>
      <AttInput
        onChangeText={(text) => onChangeQuantity(text)}
        keyboardType="numeric"
      />

      <FormButton title="Create Product" onPress={() => handleCreation()} />
    </Container>
  );
}
