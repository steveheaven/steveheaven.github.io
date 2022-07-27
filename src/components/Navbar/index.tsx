import { Image, NumberInput } from "@mantine/core";
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
import { DrawingProps } from "../Whiteboard";
import * as S from "./styles";
import brushGrey from "../../assets/icons/brush-grey.svg";
import brushActive from "../../assets/icons/brush-active.svg";
import imgGrey from "../../assets/icons/img-grey.svg";
import imgActive from "../../assets/icons/img-active.svg";

type NavItem = {
  image: string;
  meta?: ReactNode;
};

type Props = {
  onChange: Dispatch<SetStateAction<DrawingParams>>;
  canvas: RefObject<HTMLCanvasElement>;
  originalMousePosition: Coordinates;
  drawingProps: DrawingProps;
  params: DrawingParams;
};
export const Navbar: FC<Props> = ({
  onChange,
  params: { strokeWidth: stroke, shape },
  canvas,
  originalMousePosition,
  drawingProps,
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

  //  const getActiveItemIcon = (shape: Shape) => {
  //      switch(shape) {
  //        case Shape.Brush:

  //      }
  //  }
  const navbarConfig: Record<Shape, NavItem> = {
    Brush: {
      image: shape === Shape.Brush ? brushActive : brushGrey,
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
      image: shape === Shape.Image ? imgActive : imgGrey,
      meta: (
        <S.ImageInput
          onChange={(e) => {
            // console.log(e.target.files);
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
          // onMouseDown={drawingProps.onMouseDown}
          onBlur={() => setShape(Shape.Brush)}
          type="file"
          accept="image/png, image/gif, image/jpeg"
          placeholder=""
        />
      ),
    },
  };

  return (
    <S.List>
      {Object.entries(navbarConfig).map(([key, { meta, image }]) => (
        <S.Item key={key} onClick={() => setShape(key as Shape)}>
          <Image src={image} height={25} width="auto" />
          {meta}
        </S.Item>
      ))}
    </S.List>
  );
};
