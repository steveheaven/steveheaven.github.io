import { NumberInput } from "@mantine/core";
import {
  Dispatch,
  FC,
  ReactNode,
  RefObject,
  SetStateAction,
  useCallback,
} from "react";
import { Coordinates, Shape } from "../../types";
import { getCoordinates, insertImage } from "../../utils/tools";
import { DrawingParams } from "../Layout";
import * as S from "./styles";

type NavItem = {
  image: string;
  meta?: ReactNode;
};

type Props = {
  onChange: Dispatch<SetStateAction<DrawingParams>>;
  stroke: DrawingParams["strokeWidth"];
  canvas: RefObject<HTMLCanvasElement>;
  originalMousePosition: Coordinates;
};
export const Navbar: FC<Props> = ({
  onChange,
  stroke,
  canvas,
  originalMousePosition,
}) => {
  const setStroke = useCallback(
    (val: number) =>
      onChange((prev) => ({
        ...prev,
        strokeWidth: val,
      })),
    []
  );

  const setShape = useCallback(
    (val: Shape) =>
      onChange((prev) => ({
        ...prev,
        shape: val,
      })),
    []
  );
  const navbarConfig: Record<Shape, NavItem> = {
    Brush: {
      image: "",
      meta: (
        <NumberInput
          style={{ width: "60px" }}
          value={stroke}
          min={1}
          max={99}
          size="xs"
          onChange={(value: number) => {
            setStroke(value);
          }}
        />
      ),
    },
    Image: {
      image: "",
      meta: (
        <S.ImageInput
          onChange={(e) => {
            console.log(e.target.files);
            const newMousePosition = getCoordinates(e)(canvas) || {
              x: 0,
              y: 0,
            };
            insertImage({
              canvas,
              files: e.target.files,
              originalMousePosition,
              newMousePosition,
            });
            setShape(Shape.Brush);
          }}
          type="file"
          accept="image/png, image/gif, image/jpeg"
        />
      ),
    },
  };

  return (
    <S.List>
      {Object.entries(navbarConfig).map(([key, { meta }]) => (
        <S.Item key={key} onClick={() => setShape(key as Shape)}>
          {key}
          {meta}
        </S.Item>
      ))}
    </S.List>
  );
};
