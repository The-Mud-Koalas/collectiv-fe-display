import { getRequest } from "@/lib/fetch";

export const getLocationById = async (locationId: string) => {
  const endpoint = `/space/detail/${locationId}`;

  const location = await getRequest({ endpoint });
  return location;
};

export const getEventsByLocationId = (locationId: string) => async () => {
    const searchParams = new URLSearchParams({ location_id: locationId });
    const endpoint = "/event/search";

    const listOfEvents = await getRequest({ endpoint, searchParams });
    return listOfEvents as PaginatedResults<EventDetail[]>;
}
