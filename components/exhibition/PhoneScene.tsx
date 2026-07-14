"use client";

import {
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { useReducedMotion } from "framer-motion";

interface PhoneSceneProps {
  children: (parallax: { x: number; y: number }) => ReactNode;
  className?: string;
  intensity?: number;
}

export function PhoneScene({
  children,
  className = "",
  intensity = 12,
}: PhoneSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: nx * intensity, y: ny * intensity });
  };

  const onLeave = () => setParallax({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children(parallax)}
    </div>
  );
}
