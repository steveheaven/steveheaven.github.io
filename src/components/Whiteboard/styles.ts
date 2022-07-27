import { Button, ButtonProps } from "@mantine/core";
import styled from "styled-components";

export const Board = styled.canvas`
  background-color: white;
  width: 80%;
  position: absolute;
  height: 100vh;
  top: 15vh;
  bottom: 0;
  border-radius: 5px;
  cursor: crosshair;
`;

export const CurrentCoordinates = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const ClearButton = styled(Button)<ButtonProps<any>>`
  width: 100px;
`;

export const NavWrap = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  justify-content: space-betwen;
`;
