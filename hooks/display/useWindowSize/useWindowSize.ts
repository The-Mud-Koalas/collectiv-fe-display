import { useEffect, useState } from "react"

const useWindowSize = () => {
    const [windowHeight, setWindowHeight] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0); 

    useEffect(() => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowHeight(window.innerHeight);
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { windowHeight, windowWidth }
}

export default useWindowSize;