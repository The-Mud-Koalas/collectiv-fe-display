import React from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getRequest } from "@/lib/fetch";
import Template from "@/components/layout/Template";
import EventDashboard from "@/components/events/EventDashboard";

export const getServerSideProps = (async (context) => {
  const eventId = context.query.id as string;
  try {
    const event = (await getRequest({
      endpoint: `/event/detail/${eventId}`,
    })) as EventDetail;
    return { props: { event } };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}) satisfies GetServerSideProps<{ event: EventDetail }>;

const EventDetailPage = ({
    event,
  }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
      <Template>
        <EventDashboard eventDetails={event} />
      </Template>
    );
  };

export default EventDetailPage;
