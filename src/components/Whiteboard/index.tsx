import {
  FC,
  useCallback,
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Coordinates, DrawLineParams } from "../../types";
import {
  clearBoard,
  getCoordinates,
  startDrawing,
  getPaintAction,
  renderDBCanvas,
} from "../../utils/tools";
import { DrawingParams } from "../Layout";
import { Navbar } from "../Navbar";
import * as S from "./styles";
import { ref, set } from "firebase/database";
import db from "../../utils/firebase";

type Props = {
  params: DrawingParams;
  onChange: Dispatch<SetStateAction<DrawingParams>>;
};
export const Whiteboard: FC<Props> = ({
  params: { shape, strokeWidth: stroke, color },
  onChange,
}) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [mousePosition, setMousePosition] = useState<Coordinates>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    renderDBCanvas(canvas);
    if (ctx) {
      setContext(ctx);
    }
  }, [canvas]);

  const onMouseMove = useCallback(
    // @TODO: typing
    (e: any) => {
      if (isDrawing) {
        const newMousePosition = getCoordinates(e)(canvas);
        if (mousePosition && newMousePosition) {
          const params: DrawLineParams = {
            canvas,
            originalMousePosition: mousePosition,
            newMousePosition,
            color,
            stroke,
          };
          getPaintAction(shape)(params);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isDrawing, mousePosition, stroke, context]
  );
  const onMouseLeave = useCallback(() => {
    setIsDrawing(false);
    setMousePosition({ x: 0, y: 0 });
    const ctx = canvas.current?.getContext("2d");
    set(ref(db, "canvas/"), {
      canvasUrl: canvas.current?.toDataURL(),
    });
    if (ctx) {
      setContext(ctx);
    }
  }, []);

  const onMouseDown = useCallback(
    (e: any) => startDrawing(e)(canvas, setMousePosition, setIsDrawing),
    [canvas]
  );

  const canvasProps = () => ({
    onMouseDown,
    onMouseMove,
    onMouseLeave,
    onMouseUp: onMouseLeave,
    width: canvas.current?.offsetWidth,
    height: window.innerHeight,
  });

  return (
    <>
      <S.NavWrap>
        <Navbar
          stroke={stroke}
          onChange={onChange}
          canvas={canvas}
          originalMousePosition={mousePosition}
        />
        <S.ClearButton onClick={() => clearBoard(canvas)} color="red">
          Clear
        </S.ClearButton>
      </S.NavWrap>
      <S.Board {...canvasProps()} ref={canvas} />
    </>
  );
};
