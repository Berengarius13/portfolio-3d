// Use menuOpened prop to change CSS and add HTML accordingly 
import { motion } from "framer-motion";

export const Menu = (props) => {
    const {onSectionChange, menuOpened, setMenuOpened, section} = props;
    return(
        <>
            <button
            onClick={() => setMenuOpened(!menuOpened)}
                className="z-20 fixed top-6 right-8 md:top-12 md:right-12 p-3 bg-indigo-700 w-11 h-11 rounded-md"
            >
                {/* We are inside button property and we are defining 3 white lines which rotates according to menu state */}
            <div
            className={`bg-white h-0.5 rounded-md w-full transition-all ${
                menuOpened ? "rotate-45  translate-y-0.5" : ""
            }`}
            />
            <div
            className={`bg-white h-0.5 rounded-md w-full my-1 ${
                menuOpened ? "hidden" : ""
            }`}
            />
            <div
            className={`bg-white h-0.5 rounded-md w-full transition-all ${
                menuOpened ? "-rotate-45" : ""
            }`}
            
            />
            </button>

            <button
            onClick={() => {
                if(section <= 4){
                    onSectionChange(5);
                }
                else{
                    onSectionChange(0)
                }
            }}
                className={`z-20 fixed top-6 right-24 md:top-12 md:right-32 shadow-sm  border-black p-3 ${section <= 4? "bg-gray-700 w-28 md:w-36" : "bg-white md:w-24 md:h-11 "}  h-12 rounded-md`}
            >
                {/* We are inside button property and we are defining 3 white lines which rotates according to menu state */}
            
                {
                    (section <= 4)? <> <div
                    className={` text-white -translate-y-0.5   ${
                        menuOpened ? "bg-white" : ""
                    } ${section === 5 ? "rotate-180 shadow" : "" }  `}
                    
                    >
                        <motion.p  
                            whileHover={{ scale: 1.1 }}
                            initial={{ opacity: 10, x: -35 }}
                            animate={{ opacity: 1, x: 0, scale: 1.08 }}
                            transition={{ duration: 15 }}
                        > 
                        Press Start</motion.p>    
                    </div> </>
                    : 
                    <> 
                    <div
                    className={` text-gray-700 -translate-y-0.5 bg-white font ${
                        menuOpened ? "bg-white" : ""
                    } ${section === 5 ? "rotate-360" : "" }  `}
                    >
                        Return    
                    </div>  
                    </>
                }
            
            </button>
            
            {/* Change width of menu section using tailwind CSS */}
            <div
                className={`z-10 fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col
            ${menuOpened ? "w-70 md:w-80" : "w-0"}`}
            >
                <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
                <MenuButton label="About" onClick={() => onSectionChange(0)} />
                <MenuButton label="Skills" onClick={() => onSectionChange(1)} />
                <MenuButton label="Projects" onClick={() => onSectionChange(2)} />
                <MenuButton label="Contact" onClick={() => onSectionChange(3)} />
                <MenuButton label="Journey" onClick={() => onSectionChange(5)} />
                </div>
            </div>
        </>
    )
}

const MenuButton = (props) => {
    const { label, onClick } = props;
    return (
      <button
        onClick={onClick}
        className="text-2xl font-bold cursor-pointer hover:text-indigo-600 transition-colors"
      >
        {label}
      </button>
    );
  };