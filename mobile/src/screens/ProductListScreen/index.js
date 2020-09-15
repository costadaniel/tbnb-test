import React, { useEffect, useState } from "react";
import { View, FlatList, DeviceEventEmitter } from "react-native";
import Product from "../../components/Product";

import { api } from "../../services/api";

export default function ProductListScreen() {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function getProducts() {
    try {
      const { data } = await api.get("/");
      setProducts(data);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  }

  function handleRefresh() {
    setRefreshing(true);
    getProducts();
  }

  useEffect(() => {
    getProducts();
    DeviceEventEmitter.addListener("getProducts", () => getProducts());

    return DeviceEventEmitter.removeListener("getProducts");
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        renderItem={({ item }) => <Product props={item} />}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={() => handleRefresh()}
        style={{ flexGrow: 1 }}
      />
    </View>
  );
}
