import { useCallback } from "react";

let useScroll = (element, activeItem, _eachItem, _gap, _visibleItems) => {
  let calcScroll = useCallback(
    (smooth) => {
      if (!element.current) return;

      let scrollTo = (smooth, value) => {
        element.current.scrollTo({
          top: value,
          behavior: smooth === true ? "smooth" : "instant",
        });
      };

      let orZero = (value) => Math.max(value, 0);

      let threshold = _visibleItems * _eachItem;

      let calcTop = Math.max((_eachItem + _gap) * activeItem, 0);
      let calcT = orZero((_eachItem + _gap) * (activeItem - _visibleItems + 1));
      let calcB = orZero((_eachItem + _gap) * activeItem);

      let { scrollTop } = element.current;

      if (calcTop - scrollTop >= threshold) {
        scrollTo(smooth, calcT);
      } else if (calcTop - scrollTop <= -_eachItem) {
        scrollTo(smooth, calcB);
      } else if (calcTop === 0) {
        scrollTo(smooth, 0);
      }
    },
    [activeItem, element, _eachItem, _gap, _visibleItems],
  );

  return calcScroll;
};

export default useScroll;
