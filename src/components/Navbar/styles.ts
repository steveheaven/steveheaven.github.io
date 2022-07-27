import { Button, ButtonProps } from "@mantine/core";
import styled from "styled-components";

export const List = styled.nav`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30%;
  font-size: 0.9em;
`;
export const Item = styled.div`
  cursor: pointer;
  display: flex;
`;

export const ClearButton = styled(Button)<ButtonProps<any>>`
  width: 100px;
  margin: 30px 0 0 0;
`;
export const ImageInput = styled.input`
  opacity: 0;
  width: 50px;
  position: relative;
  left: -40px;
  /* cursor: pointer; */
`;
