import {useState, useEffect} from 'react';

export function useWindowHeight() {
    const [windowSize, setWindowSize] = useState(window.innerHeight);

    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerHeight);
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}
