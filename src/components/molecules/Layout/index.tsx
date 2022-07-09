import { FC, useState } from "react";
import { Navbar } from "../Navbar";
import * as S from "./styles";
import { Whiteboard } from "../../organisms/Whiteboard";

export const Layout: FC = () => {
  const [color, setColor] = useState("rgba(47, 119, 150, 0.7)");
  const swatches = [
    "#919191",
    "#868e96",
    "#fa5252",
    "#e64980",
    "#be4bdb",
    "#7950f2",
    "#6B00F2",
    "#0027F2",
    "#4c6ef5",
    "#FFFFFF",
    "#228be6",
    "#15aabf",
    "#12b886",
    "#40c057",
    "#82c91e",
    "#94B416",
    "#E7EC0E",
    "#ECBB0E",
    "#EC6B0E",
    "#EC430E",
  ];

  return (
    <S.Wrap>
      <S.Board>
        <Navbar />
        <Whiteboard shapeColor={color} />
      </S.Board>
      <S.ColorPicker
        defaultValue={swatches[0]}
        size="xs"
        swatches={swatches}
        format="rgba"
        color={color}
        onChange={setColor}
      />
    </S.Wrap>
  );
};
