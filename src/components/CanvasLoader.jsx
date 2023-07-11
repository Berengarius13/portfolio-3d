import { Html, useProgress } from "@react-three/drei";
import {motion} from "framer-motion"

export const CanvasLoader = () => {
  const { progress } = useProgress();
  const started = true;
  return (
    <Html
      as='div'
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className='canvas-loader'></span>
      <motion.p
        className=" text-4xl -translate-y-12 md:text-6xl font-bold text-indigo-500 absolute"
        
      >
        {progress.toFixed(2)}%
      </motion.p>
      <motion.p
        className=" relative text-1xl md:text-3xl whitespace-nowrap  font-bold text-gray-700 "
        initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 2 }}
      >
        Double click to interact with the Portal
      </motion.p>
    </Html>
  );
};

// export default CanvasLoader;