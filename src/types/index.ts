export enum Shape {
  Image = "Image",
  Rectangle = "Rectangle",
  Oval = "Oval",
  Polygon = "Polygon",
  Text = "Text",
  Brush = "Brush",
}

export type Coordinates = {
  x: number;
  y: number;
};

export type ShapeProps = {
  startCoords: Coordinates;
  endCoords: Coordinates;
  color: string;
};
