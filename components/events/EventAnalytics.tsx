import React from "react";
import { garamond } from "@/utils/constants/fonts";
import { GoalMeter, StatisticCard } from "./dataviz";
import {
  FaPeopleGroup,
  FaArrowsDownToPeople,
  FaFaceSmile,
} from "react-icons/fa6";
import ForumPost from "../forum/ForumPost";

interface Props {
  eventDetails: EventDetail;
}

const EventAnalytics = ({ eventDetails }: Props) => {
  return (
    <section className="mt-8">
      {eventDetails.event_type === "project" && (
        <GoalMeter
          currVal={eventDetails.progress}
          target={eventDetails.goal}
          unit={eventDetails.measurement_unit}
        />
      )}
      <div
        className={`flex flex-wrap items-center justify-center xl:gap-10 lg:gap-6 gap-4 mt-8`}
      >
        <StatisticCard
          value="456"
          icon={<FaPeopleGroup className={"text-secondary-400"} />}
        >
          <p
            className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
          >
            Registered Participants
          </p>
        </StatisticCard>
        <StatisticCard
          value="123"
          icon={<FaArrowsDownToPeople className={"text-secondary-400"} />}
        >
          <p
            className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
          >
            Attending Participants
          </p>
        </StatisticCard>
        <StatisticCard
          value="88%"
          icon={<FaFaceSmile className={`text-primary-400`} />}
        >
          <p
            className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
          >
            Participant Satisfaction
          </p>
          <p className="lg:text-sm text-xs text-secondary-400 italic">
            *based on event forum sentiment analysis
          </p>
        </StatisticCard>
      </div>
    </section>
  );
};

export default EventAnalytics;
