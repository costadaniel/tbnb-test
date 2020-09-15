import React, { useState, useEffect } from "react";
import { Alert, FlatList, DeviceEventEmitter } from "react-native";

import UpdatedProduct from "../../components/UpdatedProduct";
import TextHeader from "../../components/TextHeader";
import { Container, FormButton } from "./styles";

import AsyncStorage from "@react-native-community/async-storage";
import { api } from "../../services/api";

export default function UpdateQueue() {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function getStorageProducts() {
    let storageProducts;

    try {
      storageProducts = await AsyncStorage.getItem("@products");
      setProducts(storageProducts != null ? JSON.parse(storageProducts) : []);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  }

  async function bulkUpdate() {
    try {
      await api.post("/bulk", products);
      await AsyncStorage.clear();

      Alert.alert("Update Finish", `Products updated`, [
        {
          text: "Ok",
          onPress: () => {
            setProducts([]);
            DeviceEventEmitter.emit("getProducts");
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  function handleUpdate() {
    Alert.alert("Attention", `You want to update the products?`, [
      {
        text: "No",
        onPress: () => null,
      },
      {
        text: "Yes",
        onPress: () => bulkUpdate(),
      },
    ]);
  }

  function handleRefresh() {
    setRefreshing(true);
    getStorageProducts();
  }

  useEffect(() => {
    getStorageProducts();
    DeviceEventEmitter.addListener("getUpdatedProducts", () =>
      getStorageProducts()
    );

    return DeviceEventEmitter.removeListener("getUpdatedProducts");
  }, []);

  return (
    <Container>
      <FlatList
        data={products}
        renderItem={({ item }) => <UpdatedProduct props={item} />}
        keyExtractor={(item) => item.key.toString()}
        refreshing={refreshing}
        onRefresh={() => handleRefresh()}
        style={{ flexGrow: 1 }}
        ListHeaderComponent={<TextHeader text="Update Queue" />}
        ListHeaderComponentStyle={{ marginHorizontal: 10, marginTop: 30 }}
        ListFooterComponent={() => {
          return (
            <FormButton
              title="Update Products"
              onPress={() => handleUpdate()}
            />
          );
        }}
        ListFooterComponentStyle={{ marginHorizontal: 10, marginVertical: 20 }}
      />
    </Container>
  );
}
