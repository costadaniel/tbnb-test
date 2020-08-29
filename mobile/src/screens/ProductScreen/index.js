import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { Container, Header, ProductAtt, AttInput, FormButton } from "./styles";
import ProductHistory from "../../components/ProductHistory";

import { api } from "../../services/api";

export default function ProductScreen({ navigation, route }) {
  const { product } = route.params;

  const [productHistory, setProductHistory] = useState([]);
  const [name, onChangeName] = useState(product.name);
  const [description, onChangeDescription] = useState(product.description);
  const [price, onChangePrice] = useState(product.price);
  const [quantity, onChangeQuantity] = useState(product.quantity);

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

  useEffect(() => {
    getProductHistory();
  }, []);

  return (
    <Container>
      <Header>Product Details</Header>
      <ProductAtt>Product name</ProductAtt>
      <AttInput onChangeText={(text) => onChangeName(text)} value={name} />

      <ProductAtt>Product description</ProductAtt>
      <AttInput
        onChangeText={(text) => onChangeDescription(text)}
        value={description}
      />

      <ProductAtt>Product price</ProductAtt>
      <AttInput
        onChangeText={(text) => onChangePrice(text)}
        value={price.toString()}
        keyboardType="numeric"
      />

      <ProductAtt>Product quantity</ProductAtt>
      <AttInput
        onChangeText={(text) => onChangeQuantity(text)}
        value={quantity.toString()}
        keyboardType="numeric"
      />

      <FormButton title="Update Product" onPress={() => handleUpdate()} />

      <Header>Product Update History</Header>
      <FlatList
        data={productHistory}
        renderItem={({ item }) => <ProductHistory props={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <Header>Delete Product</Header>
      <FormButton title="Delete Product" onPress={() => handleDelete()} />
    </Container>
  );
}
