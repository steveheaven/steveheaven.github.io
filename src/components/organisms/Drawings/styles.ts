import styled, { css } from "styled-components";
import { DrawingProps } from ".";
import { Coordinates } from "../../../types";

export const LatestDrawing = styled.div<DrawingProps>`
  position: absolute;
  ${({ shapeProps, isHighlighted }) => {
    const {
      startCoords: { x: sX, y: sY },
      endCoords: { x: eX, y: eY },
      color,
    } = shapeProps;

    const isReverse = (axis: keyof Coordinates) =>
      axis === "x" ? eX < sX : eY < sY;

    return css`
      left: ${isReverse("x") ? eX : sX}px;
      top: ${isReverse("y") ? eY : sY}px;
      width: ${Math.abs(eX - sX)}px;
      height: ${Math.abs(eY - sY)}px;
      background-color: ${color};
      border: ${isHighlighted ? 2 : 0}px solid #0ea0f2;
    `;
  }}
`;
