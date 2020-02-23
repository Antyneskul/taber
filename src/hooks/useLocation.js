import { useEffect, useState } from 'react'

const useLocation = () => {
    const [location, setLocation] = useState({});

    const options = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
    };

    const success = async (pos) => {
        const crd = pos.coords;
        const {latitude, longitude} = crd;
        const token = process.env.REACT_APP_GEO_TOKEN;

        const res = await window.fetch(`https://eu1.locationiq.com/v1/reverse.php?key=${token}&lat=${latitude}&lon=${longitude}&format=json`);
        const location = await res.json();
        setLocation(location);
        localStorage.setItem('location', JSON.stringify(location))
    };

    const error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    useEffect(() => {
        (async () => {
            if (localStorage.getItem('location')) {
                setLocation(JSON.parse(localStorage.getItem('location')));
            } else {
                navigator.geolocation.getCurrentPosition(success, error, options);
            }
        })();
    }, []);

    return {location};
};

export default useLocation;
