import { ReactNode, RefObject } from "react";

export enum Shape {
  Brush = "Brush",
  Image = "Image",
}

export type Coordinates = {
  x: number;
  y: number;
};

export type ShapeProps = {
  startCoords: Coordinates;
  endCoords: Coordinates;
  color: string;
  radius: string;
};

export type DrawLineParams = {
  canvas: RefObject<HTMLCanvasElement>;
  originalMousePosition: Coordinates;
  newMousePosition: Coordinates;
  color: string;
  stroke: number;
  // @TODO: typing
  files?: any;
};

export type NavItem = {
  image: string;
  meta?: ReactNode;
};
