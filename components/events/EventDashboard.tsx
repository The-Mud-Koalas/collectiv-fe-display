import React from "react";
import { useRouter } from "next/router";
import { RoundedCircle, StatusPill } from "@/components/elements";
import { FaArrowLeft } from "react-icons/fa";
import { inter } from "@/utils/constants/fonts";
import EventInfoAndActions from "./EventInfoAndActions";
import EventAnalytics from "./EventAnalytics";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/lib/fetch";
import { useEnforceLocation } from "@/hooks/useEnforceLocation";

interface EventDashboardProps extends React.PropsWithChildren {
  eventDetails: EventDetail;
}

const EventDashboard = (props: EventDashboardProps) => {
  const { locationId, isLocationFound } = useEnforceLocation();
  const router = useRouter();

  const { data: eventDetails, isFetching } = useQuery(
    ["event-details", props.eventDetails.id],
    {
      queryFn: async () => {
        const event = (await getRequest({
          endpoint: `/event/detail/${props.eventDetails.id}`,
        })) as EventDetail;

        return event;
      },
      initialData: props.eventDetails,
      staleTime: 1000 * 60 * 15,
      refetchOnWindowFocus: false,
    }
  );

  const analytics = useQuery({
    queryKey: ["event-analytics", eventDetails.id],
    queryFn: async () => {
      const data = await getRequest({
        endpoint: `/analytics/event/${eventDetails.id}`,
      });
      return data as EventAnalytics;
    },
  });

  return (
    <div className={`lg:pt-24 lg:p-10 p-6 ${inter.className}`}>
      <section className="flex justify-between items-center">
        <RoundedCircle>
          <button
            onClick={() => {
              if (isLocationFound)
                return router.push(`/location/${locationId}`);
            }}
            className="lg:text-base md:text-base text-xs"
          >
            <FaArrowLeft />
          </button>
        </RoundedCircle>
        <StatusPill
          // @ts-expect-error
          status={eventDetails.status.toLowerCase()}
        />
      </section>
      <EventInfoAndActions eventDetails={eventDetails} />
      <EventAnalytics analytics={analytics}  />
    </div>
  );
};

export default EventDashboard;
