import React from "react";
import { Container, TimeText, QuantityText } from "./styles";

export default function ProductHistory({ props }) {
  return (
    <Container>
      <TimeText>Day: {props.created_at}</TimeText>
      <QuantityText>Amount: {props.amount}</QuantityText>
    </Container>
  );
}
