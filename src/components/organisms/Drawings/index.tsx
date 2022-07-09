import { FC } from "react";
import { ShapeProps } from "../../../types";
import * as S from "./styles";

export type DrawingProps = {
  shapeProps: ShapeProps;
  isHighlighted: boolean;
};

export const Drawings: FC<DrawingProps> = (props) => {
  return (
    <>
      <S.LatestDrawing {...props} />
    </>
  );
};
