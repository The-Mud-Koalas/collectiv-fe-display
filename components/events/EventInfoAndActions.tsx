import React from "react";
import Image from "next/image";
import cn from "clsx";
import { AiOutlineCalendar } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { capitalize } from "@/utils/helpers/formatting/capitalize";
import Link from "next/link";
import { useRouter } from "next/router";

import RegisterParticipantModal from "./RegisterParticipantModal";
import Modal from "../elements/Modal";
import VolunteerParticipantModal from "./VolunteerParticipantModal";

interface Props {
  eventDetails: EventDetail;
}

const EventInfoAndActions = ({ eventDetails }: Props) => {
  const BASE_URL = `/event/${eventDetails.id}`;

  const router = useRouter();

  const closeModal = () => {
    router.push(BASE_URL, undefined, { shallow: true });
  };

  return (
    <>
      <section className="flex gap-6 mt-5 xl:flex-row lg:justify-between flex-col">
        <div className="flex flex-col gap-4 xl:w-3/5 w-full">
          <div className="flex gap-2 items-center xl:justify-start justify-center">
            <div className="w-fit rounded-lg px-3 py-1 border-[2px] border-secondary-300 bg-secondary-200 text-secondary-400 font-bold italic text-sm">
              {/* Event Type */}
              {capitalize(eventDetails.event_type, true)}
            </div>
            <div className="w-fit rounded-lg px-3 py-1 border-[2px] border-primary-400 bg-primary-200 text-primary-500 font-bold italic text-sm">
              {/* Event Category */}
              {capitalize(eventDetails.event_category.name, true)}
            </div>
          </div>
          <h1 className="font-bold xl:text-5xl text-4xl leading-[140%] xl:text-left text-center">
            {/* event name */}
            {eventDetails.name}
          </h1>
          <div className="flex items-center lg:gap-5 gap-3 text-gray-500 xl:justify-normal justify-center xl:text-base text-sm lg:flex-nowrap flex-wrap">
            {/* information */}
            <div className="flex items-center gap-1">
              <AiOutlineCalendar />
              <span>
                {new Date(eventDetails.event_start_date_time).toDateString()}
              </span>
              <span>-</span>
              <span>
                {new Date(eventDetails.event_end_date_time).toDateString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <CiLocationOn />
              <span>{eventDetails.event_location.name}</span>
            </div>
          </div>
          <div className="flex xl:justify-start justify-center">
            <p className="font-semibold text-left lg:text-base text-sm">
              {/* description */}
              {eventDetails.description}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap xl:justify-start justify-center">
            <p className="italic text-gray-500 text-sm">tags:</p>
            {/* tags */}
            {eventDetails.event_tags.map((tag) => (
              <div
                key={tag.id}
                className="rounded-lg px-3 py-1 border-[2px] border-slate-300 bg-gray-200 text-gray-400 font-semibold italic text-xs"
              >
                {/* Event Interest Tag #n */}
                {capitalize(tag.name, true)}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-2 xl:justify-normal justify-center flex-wrap">
            <>
              {eventDetails.event_type !== "project" && (
                <Link
                  href={BASE_URL + "?registerParticipant=true"}
                  // onClick={handleRegisterAsParticipant}
                  className={cn(
                    "bg-primary-900 text-primary-400 text-sm px-6 py-2 rounded-3xl font-medium",
                    "disabled:bg-gray-300 disabled:text-gray-200"
                  )}
                >
                  Register as Participant
                </Link>
              )}
              <Link
                href={BASE_URL + "?registerVolunteer=true"}
                // onClick={handleRegisterAsVolunteer}
                className={cn(
                  "text-primary-700 text-sm border border-primary-600 px-6 py-2 rounded-3xl font-medium",
                  "disabled:text-gray-300 disabled:border-gray-300"
                )}
              >
                Register as Volunteer
              </Link>
            </>
          </div>
        </div>
        <div className="xl:w-2/5 w-full h-fit rounded-md aspect-video relative max-w-2xl xl:mx-0 mx-auto">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/event/image/${eventDetails.id}`}
            fill
            objectFit="cover"
            alt="picture"
            className="rounded-lg shadow-md border border-gray-500"
          />
        </div>
      </section>
      <Modal
        open={router.query.registerParticipant === "true"}
        onOverlayTap={closeModal}
      >
        <RegisterParticipantModal
          eventDetails={eventDetails}
          closeModal={closeModal}
        />
      </Modal>
      <Modal
        open={router.query.registerVolunteer === "true"}
        onOverlayTap={closeModal}
      >
        <VolunteerParticipantModal
          eventDetails={eventDetails}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
};

export default EventInfoAndActions;
