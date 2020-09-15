import styled from "styled-components/native";

export const Container = styled.ScrollView`
  padding-left: 20px;
  padding-right: 20px;
`;

export const Header = styled.Text`
  font-weight: bold;
  font-size: 22px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const ProductAtt = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const AttInput = styled.TextInput`
  background-color: #fff;
  border-color: #333;
  border-width: 1px;
  height: 40px;
  margin-bottom: 10px;
  padding: 8px;
`;

export const FormButton = styled.Button`
  margin-bottom: 30px;
`;

export const ErrorText = styled.Text`
  font-weight: bold;
  color: #f00;
  font-size: 12px;
`;
