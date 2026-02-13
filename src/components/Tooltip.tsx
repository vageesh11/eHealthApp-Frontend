import React, { useState, useRef, useEffect } from "react";

type Direction = "top" | "bottom" | "left" | "right";

const TooltipButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [direction, setDirection] = useState<Direction>("top");
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top; 

    const w = rect.width;
    const h = rect.height;

    const horizontal = x < w / 3 ? "left" : x > (2 * w) / 3 ? "right" : null;
    const vertical = y < h / 3 ? "top" : y > (2 * h) / 3 ? "bottom" : null;

    const dir: Direction = vertical
      ? vertical
      : horizontal
      ? horizontal
      : "top";

    setDirection(dir);
    setShowTooltip(true);
  };

  useEffect(() => {
    if (showTooltip && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      let top = 0;
      let left = 0;

      switch (direction) {
        case "top":
          top = rect.top + scrollY - 40;
          left = rect.left + scrollX + rect.width / 2;
          break;
        case "bottom":
          top = rect.bottom + scrollY + 8;
          left = rect.left + scrollX + rect.width / 2;
          break;
        case "left":
          top = rect.top + scrollY + rect.height / 2;
          left = rect.left + scrollX - 120; 
          break;
        case "right":
          top = rect.top + scrollY + rect.height / 2;
          left = rect.right + scrollX + 8;
          break;
      }

      setTooltipPos({ top, left });
    }
  }, [showTooltip, direction]);

  const getTooltipTriangle = () => {
    switch (direction) {
      case "top":
        return (
          <div className="absolute top-full left-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white -translate-x-1/2"></div>
        );
      case "bottom":
        return (
          <div className="absolute bottom-full left-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white -translate-x-1/2"></div>
        );
      case "left":
        return (
          <div className="absolute left-full top-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white -translate-y-1/2"></div>
        );
      case "right":
        return (
          <div className="absolute right-full top-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white -translate-y-1/2"></div>
        );
    }
  };

  return (
    <div className=" flex justify-center mb-25">
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="px-6 py-3 bg-pink-400 text-white rounded hover:bg-pink-500 transition"
      >
        Click Me
      </button>

      {showTooltip && (
        <div
          className="absolute z-50"
          style={{
            top: tooltipPos.top,
            left: tooltipPos.left,
            transform:
              direction === "top" || direction === "bottom"
                ? "translateX(-50%)"
                : "translateY(-50%)",
          }}
        >
          <div className="relative bg-pink-300 border border-black rounded-lg px-4 py-2 text-black text-sm shadow-md">
            I am tooltip
            {getTooltipTriangle()}
          </div>
        </div>
      )}
    </div>
  );
};

export default TooltipButton;
