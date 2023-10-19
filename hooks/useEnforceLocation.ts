import { useQuery } from "@tanstack/react-query";
import { useGPSLocation } from "./utils/useGPSLocation";
import { getRequest } from "@/lib/fetch";

export function useEnforceLocation() {
  const { lat, lng, isPermissionRejected } = useGPSLocation();
  const { data } = useQuery({
    queryKey: ["current-disp-location"],
    queryFn: async () => {
      if (!lat || !lng) return { data: null };
      const searchParams = new URLSearchParams({
        latitude: lat.toString(),
        longitude: lng.toString(),
      });
      const location = (await getRequest({
        endpoint: "/space/get-by-coordinate",
        searchParams,
      })) as { data: EventLocation | null };
      return location;
    },
    enabled: !!lat && !!lng,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  if (isPermissionRejected) {
    return {
      isGettingLocation: false,
      isLocationFound: false,
      locationId: null,
      locationName: null,
      isPermissionRejected,
    } as const;
  }

  if (!data) {
    return {
      isGettingLocation: true,
      isLocationFound: false,
      locationId: null,
      locationName: null,
      isPermissionRejected,
    } as const;
  }

  if (data.data === null) {
    return {
      isGettingLocation: false,
      isLocationFound: false,
      locationId: null,
      locationName: null,
      isPermissionRejected,
    } as const;
  }

  return {
    isGettingLocation: false,
    isLocationFound: true,
    locationId: data.data.id,
    locationName: data.data.name,
    isPermissionRejected,
  } as const;
}
