import { useCallback, useRef, useState } from "react";

const useLongPress = (
  onLongPress: (e: any) => void,
  { shouldPreventDefault = true, delay = 300 } = {}
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const target = useRef();

  const startPressTimer = () =>
    setTimeout(() => {
      console.log("timer");
    }, 500);

  const start = useCallback(
    (event: any) => {
      // if (shouldPreventDefault && event.target) {
      //   event.target.addEventListener("touchend", preventDefault, {
      //     passive: false,
      //   });
      //   target.current = event.target;
      // }
      // timeout.current = setTimeout(() => {
      //   onLongPress(event);
      //   setLongPressTriggered(true);
      // }, delay);
    },
    [onLongPress, delay, shouldPreventDefault]
  );

  const clear = useCallback(
    (event: any, shouldTriggerClick = true) => {
      //   timeout.current && clearTimeout(timeout.current);
      //   setLongPressTriggered(false);
      //   if (shouldPreventDefault && target.current) {
      //     // @ts-ignore
      //     target.current.removeEventListener("touchend", preventDefault);
      //   }
    },
    [shouldPreventDefault, longPressTriggered]
  );

  return {
    onMouseDown: (e: any) => startPressTimer(),
    onTouchStart: (e: any) => start(e),
    onMouseUp: (e: any) => clear(e),
    onMouseLeave: (e: any) => clear(e, false),
    onTouchEnd: (e: any) => clear(e),
  };
};

const isTouchEvent = (event: any) => {
  return "touches" in event;
};

const preventDefault = (event: any) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;
