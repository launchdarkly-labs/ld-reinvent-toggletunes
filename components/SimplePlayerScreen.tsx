import { motion } from "framer-motion";
import { IoIosMusicalNotes } from "react-icons/io";
import MusicPlayingBar from "./MusicPlayingBar";

const SimplePlayerScreen = () => {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.25 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="h-screen w-full sm:max-w-7xl mx-auto flex flex-col justify-between"
    >
      <img src="/images/ToggleTunes.png" className="h-[4rem] sm:h-[5rem] mx-4 sm:mx-auto mt-6 sm:mt-[2rem] " />

      <section className="w-full sm:h-full mx-auto flex justify-center items-center my-4">
        <div className="flex items-center justify-center  cardgradient w-[80%] sm:w-[50%]  rounded-xl aspect-square">
          <IoIosMusicalNotes className="h-40 w-40 sm:h-96 sm:w-96 mx-auto" />
        </div>
      </section>
      <div className="h-[18rem] sm:h-[13rem] w-full block">
      </div>
    </motion.main>
  );
};

export default SimplePlayerScreen;
