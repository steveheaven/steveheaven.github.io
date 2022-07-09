import * as S from "./styles";

export const Navbar = () => {
  const navbarConfig = {
    "Insert Image": "imagePath",
    Rectangle: "imagePath",
    Oval: "imagePath",
    Polygon: "imagePath",
    Text: "imagePath",
    Brush: "imagePath",
  };

  return (
    <S.List>
      {Object.entries(navbarConfig).map(([key, value]) => (
        <S.Item key={key}>{key}</S.Item>
      ))}
    </S.List>
  );
};
