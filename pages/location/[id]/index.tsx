import Template from "@/components/layout/Template";
import { garamond, inter } from "@/utils/constants/fonts";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import cn from "clsx";
import {
  getEventsByLocationId,
  getLocationById,
} from "@/utils/fetchers/location";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import EventCard from "@/components/events/EventCard";

export const getServerSideProps = (async (context) => {
  try {
    const locationId = context.params?.id as string;
    const currentLocation: EventLocation = await getLocationById(locationId);

    return { props: { currentLocation } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}) satisfies GetServerSideProps<{ currentLocation: EventLocation }>;

const LocationHomePage = ({
  currentLocation,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [currentLocation.id, "event"],
    queryFn: getEventsByLocationId(currentLocation.id),
  });
  if (isLoading) return <></>;
  if (isError) return <></>;
  return (
    <Template>
      <section id="dashboard" className="px-10 pt-12">
        <h1 className={cn("font-bold text-5xl", inter.className)}>
          {currentLocation.name}
        </h1>
      </section>
      <section id="activities-list" className="py-4">
        <h4 className={cn(garamond.className, "font-normal text-2xl px-10")}>
          Activities on the space
        </h4>
        <div className="flex gap-3 pl-10 overflow-x-auto scrollbar-react-international-phone-country-selector">
          {events.results.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
      </section>
    </Template>
  );
};

export default LocationHomePage;
