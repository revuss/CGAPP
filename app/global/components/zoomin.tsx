"use client";
import { useEffect, ReactNode } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ZoomInOutRevealProps {
  children: ReactNode;
}

export function ZoomInOutReveal({ children }: ZoomInOutRevealProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      className="overflow-hidden"
      variants={{
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: { duration: 0.8, ease: "easeOut", bounce: 0.4 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
