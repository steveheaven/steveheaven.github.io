import { FC, useCallback, useState } from "react";
import useLongPress from "../../../hooks/useLongPress";
import { Coordinates, Shape } from "../../../types";
import { Drawings } from "../Drawings";
import * as S from "./styles";

type Props = {
  shapeColor: string;
};
export const Whiteboard: FC<Props> = ({ shapeColor }) => {
  const [globalCoords, setGlobalCoords] = useState<Coordinates>({ x: 0, y: 0 });
  const { x, y } = globalCoords;
  // const [localCoords, setLocalCoords] = useState<Coordinates>({ x: 0, y: 0 });
  // const [activeShape, setActiveShape] = useState<Shape>(Shape.Rectangle);
  const [userIsDrawing, setUserIsDrawing] = useState(false);
  const [newShapeStart, setNewShapeStart] = useState<Coordinates>({
    x: 0,
    y: 0,
  });
  const [newShapeEnd, setNewShapeEnd] = useState<Coordinates>({
    x: 0,
    y: 0,
  });
  const [isHighlighted, setIsHighlighted] = useState(true);

  const onLongPress = (e: any) => {
    console.log(e.shiftKey);
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 10,
  };
  const longPressEvent = useLongPress(onLongPress, defaultOptions);
  // @TODO: types
  const handleMouseMove = useCallback((event: any) => {
    setGlobalCoords({
      x: event.clientX - event.currentTarget.offsetLeft,
      y: event.clientY - event.currentTarget.offsetTop,
    });
  }, []);

  const shapeProps = {
    startCoords: {
      x: newShapeStart.x,
      y: newShapeStart.y,
    },
    endCoords: {
      x: userIsDrawing ? x : newShapeEnd.x,
      y: userIsDrawing ? y : newShapeEnd.y,
    },
    color: shapeColor,
  };

  return (
    <S.Wrap
      // {...longPressEvent}
      onMouseMove={handleMouseMove}
      onTouchStart={(e) => {
        console.log(e.shiftKey);
      }}
      onMouseDown={(e) => {
        setUserIsDrawing(true);
        setNewShapeStart({
          x,
          y,
        });
      }}
      onMouseUp={() => {
        setUserIsDrawing(false);
        setNewShapeEnd({
          x,
          y,
        });
      }}
    >
      <S.CurrentCoordinates>
        x: {x} y: {y}
      </S.CurrentCoordinates>
      <Drawings
        shapeProps={shapeProps}
        isHighlighted={isHighlighted}
        {...longPressEvent}
      />
    </S.Wrap>
  );
};
