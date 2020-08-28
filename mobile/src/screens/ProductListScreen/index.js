import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import Product from "../../components/Product";

import { api } from "../../services/api";

export default function ProductListScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await api.get("/");
        setProducts(data);
      } catch (error) {}
    }

    getProducts();
  }, []);

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <Product props={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
