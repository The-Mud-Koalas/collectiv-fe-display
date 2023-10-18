import { useCallback, useEffect, useState } from "react";

const useGPSLocation = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [isGettingGPS, setGettingGPS] = useState(false);

  const getCoords = useCallback(async () => {
    setGettingGPS(true)
    const gpsPromise: Promise<GeolocationPosition> = new Promise(
      (resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    const coords = await gpsPromise;
    setLat(coords.coords.latitude);
    setLng(coords.coords.longitude);
    setGettingGPS(false)
  }, []);

  useEffect(() => {
    getCoords();
  }, [getCoords]);

  return { lat, lng, getCoords, isGettingGPS };
};

export { useGPSLocation };
