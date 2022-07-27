import styled from "styled-components";
import { ColorPicker as ManColorPicker } from "@mantine/core";

export const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: blue; */
  justify-content: space-between;
`;

export const Board = styled.div`
  padding: 3vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f3f3;
  height: 94vh;
  width: 80vw;
  height: 120vh;
`;

export const PanelWrap = styled.div`
  display: flex;
  /* background-color: yellow; */
  justify-content: center;
  width: 17vw;
`;

export const PanelContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ColorPicker = styled(ManColorPicker)`
  margin: 4vh auto 0 auto;
  width: 180px;
  height: 170px;
`;
export const Label = styled.label`
  margin: 20px 0 0 0;
  font-size: 0.7em;
`;
