import styled from "styled-components";
import { ColorPicker as ManColorPicker } from "@mantine/core";

export const Wrap = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Board = styled.div`
  padding: 3vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f3f3;
  height: 94vh;
  width: 80vw;
`;

export const ColorPicker = styled(ManColorPicker)`
  margin: 4vh auto 0 auto;
  width: 180px;
  height: 170px;
`;
