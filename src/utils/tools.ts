import { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";
import { Coordinates, DrawLineParams, Shape } from "../types";
import { ref, get, child } from "firebase/database";
import db from "../utils/firebase";

export const clearBoard = (canvas: RefObject<HTMLCanvasElement>) => {
  const cnv = canvas.current;
  const ctx = cnv?.getContext("2d");
  if (ctx && cnv) {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
  }
};

export const getCoordinates =
  (event: (MouseEvent & ChangeEvent<HTMLInputElement>) | any) =>
  (canvas: RefObject<HTMLCanvasElement>) => {
    if (!canvas.current) {
      return;
    }
    const { offsetLeft, offsetTop } = canvas.current;
    return {
      x: event.pageX - offsetLeft,
      y: event.pageY - offsetTop,
    };
  };

export const startDrawing =
  (event: any) =>
  (
    canvas: RefObject<HTMLCanvasElement>,
    setMousePosition: Dispatch<SetStateAction<Coordinates>>,
    setIsDrawing: Dispatch<SetStateAction<boolean>>
  ) => {
    const coordinates = getCoordinates(event)(canvas);
    if (coordinates) {
      // @TODO: use reducer if more onChange functions are gonna be presented
      setMousePosition(coordinates);
      setIsDrawing(true);
    }
  };

const drawLine = ({
  color,
  originalMousePosition,
  newMousePosition,
  stroke,
  canvas,
}: DrawLineParams) => {
  if (!canvas.current) {
    return;
  }
  const ctx = canvas.current?.getContext("2d");

  if (ctx) {
    ctx.strokeStyle = color;
    ctx.lineJoin = "round";
    ctx.lineWidth = stroke;
    ctx.beginPath();
    ctx.moveTo(originalMousePosition.x, originalMousePosition.y);
    ctx.lineTo(newMousePosition.x, newMousePosition.y);
    ctx.closePath();

    ctx.stroke();
  }
};

export const insertImage = ({
  originalMousePosition,
  newMousePosition,
  canvas,
  files,
}: Omit<DrawLineParams, "color" | "stroke">) => {
  const cnv = canvas.current;
  if (!cnv) {
    return;
  }
  const ctx = cnv?.getContext("2d");

  if (ctx) {
    const img = new Image();
    img.onload = function () {
      const factor =
        (cnv.width / img.naturalWidth) * img.naturalHeight > window.innerHeight
          ? cnv.height / img.naturalHeight
          : cnv.width / img.naturalWidth;
      ctx.drawImage(
        img,
        0,
        0,
        img.naturalWidth * factor,
        img.naturalHeight * factor
      );
    };
    img.src = URL.createObjectURL(files[0]);
  }
};

export const getPaintAction = (type: Shape) => {
  switch (type) {
    case Shape.Brush:
      return drawLine;
    case Shape.Image:
      return insertImage;
  }
};

const renderImageToCanvas = (url: string, ctx: CanvasRenderingContext2D) => {
  const img = new Image();
  img.src = url;
  img.onload = (e) => {
    ctx.drawImage(img, 0, 0);
  };
  img.onerror = function (e) {
    console.log(e);
  };
};

export const renderDBCanvas = (canvas: RefObject<HTMLCanvasElement>) => {
  if (!canvas.current) {
    return;
  }
  const ctx = canvas.current?.getContext("2d");
  if (ctx) {
    const dbRef = ref(db);

    get(child(dbRef, "canvas/")).then((snapshot) => {
      if (snapshot.exists()) {
        const url = snapshot.val().canvasUrl;
        renderImageToCanvas(url, ctx);
      } else {
        console.log("No data available");
      }
    });
  }
};
