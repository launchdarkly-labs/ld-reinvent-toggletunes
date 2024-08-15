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
      className="h-screen mx-auto w-full"
    >
      <img src="/images/ToggleTunes.png" className="h-16 my-10 mx-auto" />

      <section
        className="flex items-center justify-center cardgradient h-2/3 w-1/3 mx-auto rounded-xl"
        // Force the div to be a square by setting equal viewport width values to width and height
      >
        <IoIosMusicalNotes className="h-96 w-96 mx-auto" />
      </section>
    </motion.main>
  );
};

export default SimplePlayerScreen;
