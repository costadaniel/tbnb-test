import React from "react";
import { Container, Header } from "./styles";

export default function TextHeader(props) {
  return (
    <Container>
      <Header>{props.text}</Header>
    </Container>
  );
}
