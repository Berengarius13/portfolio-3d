import { useProgress } from "@react-three/drei"
import { useEffect } from "react";

export const LoadingScreen = (props) => {
    // We will use useProgress hook from drei to get progress, total items loaded
    const {started, setStarted} = props;
    const {progress, total, loaded, item} = useProgress();

    // Wait some time to show 
    useEffect(() =>{
         if(progress === 100){
            // Set started will be called after 500 ms
            setTimeout(() => {
                setStarted(true);
            }, 500);
         }
    }, [progress, total, loaded, item]);
    return (
        <>
            {/* If started we remove the opacity */}
            <div
            className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-1000 pointer-events-none
        flex items-center justify-center bg-green-50  bg-gree
        ${started ? "opacity-0" : "opacity-100"}`}
            >
            <div className="text-4xl md:text-9xl font-bold text-green-900 relative">
                <div
                className="absolute left-0 top-0  overflow-hidden truncate text-clip transition-all duration-500"
                style={{
                    width: `${progress}%`,
                }}
                >
                Welcome
                </div>
                <div className="opacity-40">Welcome</div>
            </div>
            </div>
        </>
    )
}