import styled from "styled-components/native";
import { StatusBar } from "react-native";

export const Container = styled.View`
  flex: 1;
  margin-top: ${StatusBar.currentHeight || 0}px;
`;

export const FormButton = styled.Button`
  margin-bottom: 30px;
`;
