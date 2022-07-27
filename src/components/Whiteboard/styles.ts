import { Button, ButtonProps } from "@mantine/core";
import styled from "styled-components";

export const Board = styled.canvas`
  background-color: white;
  min-width: 80vw;
  position: absolute;
  height: 100vh;
  top: 10vh;
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
  height: 50px;
  justify-content: space-between;
`;
