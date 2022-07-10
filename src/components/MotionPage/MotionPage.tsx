import { Component, ComponentType } from "react";
import { motion } from "framer-motion";

const MotionPage = <T extends {}>(Component: ComponentType<T>) => {
  const MotionPageWrapper = (props: T) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Component {...props} />
      </motion.div>
    );
  };

  return MotionPageWrapper;
};

export default MotionPage;
