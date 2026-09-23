import React, { useEffect, useRef } from "react";
import katex from "katex";

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
  fallbackText?: string;
}

export const MathView: React.FC<MathViewProps> = ({
  math,
  block = false,
  className = "",
  fallbackText
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    try {
      katex.render(math, containerRef.current, {
        displayMode: block,
        throwOnError: false,
        strict: false
      });
    } catch (err) {
      if (containerRef.current) {
        containerRef.current.innerText = fallbackText || math;
      }
    }
  }, [math, block, fallbackText]);

  return (
    <span
      ref={containerRef}
      className={`inline-block ${block ? "my-2 text-center w-full overflow-x-auto py-1" : ""} ${className}`}
    />
  );
};
