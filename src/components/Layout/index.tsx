import { FC, useState } from "react";
import * as S from "./styles";
import { Whiteboard } from "../Whiteboard";
import { swatches } from "../../config";
import { Shape } from "../../types";

export type DrawingParams = {
  color: string;
  strokeWidth: number;
  shape: Shape;
};
export const Layout: FC = () => {
  const [params, setParams] = useState<DrawingParams>({
    color: "",
    strokeWidth: 10,
    shape: Shape.Brush,
  });

  const { color } = params;

  const setColor = (val: string) =>
    setParams((prev) => ({
      ...prev,
      color: val,
    }));

  return (
    <S.Wrap>
      <S.Board>
        <Whiteboard params={params} onChange={setParams} />
      </S.Board>
      <S.PanelWrap>
        <S.PanelContent>
          <S.ColorPicker
            defaultValue={swatches[7]}
            size="xs"
            swatches={swatches}
            format="rgba"
            color={color}
            onChange={setColor}
          />
        </S.PanelContent>
      </S.PanelWrap>
    </S.Wrap>
  );
};
