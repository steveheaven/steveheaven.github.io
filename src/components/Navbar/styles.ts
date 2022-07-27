import { Button, ButtonProps } from "@mantine/core";
import styled from "styled-components";

export const List = styled.nav`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: left;
  gap: 50px;
  width: 30%;
  font-size: 0.9em;
`;
export const Item = styled.div`
  cursor: pointer;
  display: flex;
  gap: 5px;
`;

export const ClearButton = styled(Button)<ButtonProps<any>>`
  width: 70px;
  margin: 30px 0 0 0;
`;
export const ImageInput = styled.input`
  &[type="file"] {
    opacity: 0;
    width: 50px;
    position: relative;
    left: -40px;
    cursor: pointer;
  }
`;
