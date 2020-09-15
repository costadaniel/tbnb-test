import React from "react";
import { Container, TimeText, QuantityText } from "./styles";

export default function ProductHistory({ props }) {
  let date = new Date(props.created_at).toDateString();
  let time = new Date(props.created_at).toTimeString();

  return (
    <Container>
      <TimeText>Date: {date}</TimeText>
      <TimeText>Time: {time}</TimeText>
      <QuantityText>Amount: {props.amount}</QuantityText>
    </Container>
  );
}
