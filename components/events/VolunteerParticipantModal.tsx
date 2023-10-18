import { garamond, inter } from "@/utils/constants/fonts";
import cn from "clsx";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import GreenTick from "../svg/GreenTick";
import { AnimatePresence, motion } from "framer-motion";
import { COLORS } from "@/utils/constants/colors";
import EmailParticipationForm from "./EmailParticipationForm";
import PhoneParticipationForm from "./PhoneParticipationForm";
import GreenTickNoBorder from "../svg/GreenTickNoBorder";

interface Props {
  eventDetails: EventDetail;
  closeModal: () => void;
}

const VOLUNTEER_REQUIREMENTS = [
  { id: "vol-1", text: "Demonstrate great commitment." },
  { id: "vol-2", text: "Exhibit strong communication skills." },
  { id: "vol-3", text: "Clearly express your Mmotivation and availability" },
  { id: "vol-4", text: "Being honest and minimizing foulplay." },
];

const VolunteerParticipantModal: React.FC<Props> = ({
  eventDetails,
  closeModal,
}) => {
  const [mode, setMode] = useState<"phone" | "email">("email");
  return (
    <div
      style={{ width: "min(90vw, 700px)" }}
      className="rounded-md py-8 px-8 bg-white flex flex-col items-center gap-4 relative"
    >
      <button
        onClick={closeModal}
        className="absolute right-5 top-5 hover:bg-gray-200 p-1 rounded-md"
      >
        <RxCross2 />
      </button>
      <div className="text-center mx-auto">
        <div className="flex justify-center items-center">
          <GreenTick />
        </div>
        <h1 className={`${garamond.className} text-5xl text-primary-900 my-3 `}>
          Register as Volunteer
        </h1>
        <div className={cn("flex flex-col my-4 items-center gap-4", inter.className)}>
              <p
                className={`${inter.className} text-xl font-medium text-primary-800`}
              >
                Here are the requirements to apply as volunteer:
              </p>
              <ul className="flex flex-col">
                {VOLUNTEER_REQUIREMENTS.map((req) => (
                  <li
                    key={req.id}
                    className="flex items-center gap-2 text-base font-medium text-primary-800"
                  >
                    <GreenTickNoBorder />
                    <p>{req.text}</p>
                  </li>
                ))}
              </ul>
            </div>
        <div className="w-full bg-secondary-200 flex items-center gap-3 px-5 py-2 rounded-lg">
          <div className="p-2 rounded-[50%] bg-white">📩</div>
          <p
            className={cn(
              inter.className,
              "text-secondary-500 font-semibold text-base"
            )}
          >
            Use the email or phone you signed up with
          </p>
          <div
            className={cn(
              "bg-secondary-500 rounded-full text-sm px-2 py-1 flex gap-2",
              inter.className
            )}
          >
            <motion.button
              animate={{
                backgroundColor:
                  mode === "email" ? "#fff" : COLORS.secondary[500],
                color: mode === "email" ? COLORS.secondary[500] : "#fff",
              }}
              onClick={() => setMode("email")}
              className="rounded-full px-2 py-1"
            >
              Email
            </motion.button>
            <motion.button
              animate={{
                backgroundColor:
                  mode === "phone" ? "#fff" : COLORS.secondary[500],
                color: mode === "phone" ? COLORS.secondary[500] : "#fff",
              }}
              onClick={() => setMode("phone")}
              className="rounded-full px-2 py-1"
            >
              Phone
            </motion.button>
          </div>
        </div>
      </div>
      <AnimatePresence mode="popLayout">
        {mode === "email" ? (
          <motion.div
            className="w-full px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="email"
          >
            <EmailParticipationForm
              regisType="volunteer"
              eventDetails={eventDetails}
              closeModal={closeModal}
            />
          </motion.div>
        ) : (
          <motion.div
            className="w-full px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="phone"
          >
            <PhoneParticipationForm
              regisType="volunteer"
              eventDetails={eventDetails}
              closeModal={closeModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VolunteerParticipantModal;
