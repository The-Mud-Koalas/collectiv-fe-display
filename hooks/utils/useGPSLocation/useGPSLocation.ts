import { useCallback, useEffect, useState } from "react";

const useGPSLocation = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [isGettingGPS, setGettingGPS] = useState(false);
  const [isPermissionRejected, setIsPermissionRejected] = useState(false)

  const getCoords = useCallback(async () => {
    setGettingGPS(true)
    const gpsPromise: Promise<GeolocationPosition> = new Promise(
      (resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );
    try {
      const coords = await gpsPromise;
      setLat(coords.coords.latitude);
      setLng(coords.coords.longitude);
      setGettingGPS(false)
    } catch {
      setIsPermissionRejected(true);
    };
  }, []);

  useEffect(() => {
    getCoords();
  }, [getCoords]);

  return { lat, lng, getCoords, isGettingGPS, isPermissionRejected };
};

export { useGPSLocation };
