import React from "react";
import { motion } from "framer-motion";

const AdSection = () => {
  return (
    <motion.section
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
      className=" w-full sm:w-1/5 flex flex-row sm:flex-col gap-x-4 sm:gap-y-4 bg-ldbackground 
      rounded-md p-4 overflow-x-auto sm:overflow-y-scroll sm:h-full"
    >
      <img src="/images/djtoggle.png" className=" object-cover rounded-md" />
      <img src="/images/books.png" className=" object-cover rounded-md" />
    </motion.section>
  );
};

export default AdSection;
