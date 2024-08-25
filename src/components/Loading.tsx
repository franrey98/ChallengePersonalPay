import React from "react";
import { motion } from "framer-motion";

export const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        className="flex gap-2"
        initial="start"
        animate="end"
        variants={{
          start: {
            opacity: 0.5,
            scale: 0.8,
          },
          end: {
            opacity: 1,
            scale: 1,
            transition: {
              yoyo: Infinity,
              duration: 0.6,
            },
          },
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 bg-blue-500 rounded-full"
            animate={{
              y: [-10, 0, -10],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};
