import React, { useEffect, useRef } from "react";
import katex from "katex";

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
  fallbackText?: string;
}

// Keep legacy or malformed source strings from rendering as incorrect equations.
function normalizeMathExpression(math: string): string {
  return math
    .replace(/D\s*=\s*V\s*(?:m|\\cdot\s*m|[.*·×]\s*m)/gi, "D = \\frac{m}{V}")
    .replace(/D\s*=\s*Vm/gi, "D = \\frac{m}{V}")
    .replace(/p\s*=\s*S\s*(?:F|\\cdot\s*F|[.*·×]\s*F)/gi, "p = \\frac{F}{S}")
    .replace(/p\s*=\s*SF/gi, "p = \\frac{F}{S}")
    .replace(/F_A\s*=\s*V\s*(?:d|\\cdot\s*d|[.*·×]\s*d)/gi, "F_A = d \\cdot V");
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
      katex.render(normalizeMathExpression(math), containerRef.current, {
        displayMode: block,
        throwOnError: false,
        strict: false
      });
    } catch (err) {
      if (containerRef.current) {
        containerRef.current.innerText = fallbackText || normalizeMathExpression(math);
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
