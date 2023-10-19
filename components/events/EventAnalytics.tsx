import React from "react";
import { garamond, inter } from "@/utils/constants/fonts";
import { ChartContainer, GoalMeter, StatisticCard } from "./dataviz";
import {
  FaPeopleGroup,
  FaArrowsDownToPeople,
  FaFaceFrown,
  FaFaceMeh,
  FaFaceGrin,
} from "react-icons/fa6";
import { UseQueryResult } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import { COLORS } from "@/utils/constants/colors";
import cn from "clsx";
import {
  Bar,
  BarChart,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  analytics: UseQueryResult<EventAnalytics, unknown>;
}

const EventAnalytics = ({ analytics }: Props) => {
  if (analytics.isLoading || !analytics.data) {
    return (
      <section className="mt-12 flex flex-col items-center">
        <BeatLoader className="mx-auto" color={COLORS.primary[500]} />
      </section>
    );
  }

  const data = analytics.data;

  const sentimentScore = data.average_sentiment_score
    ? data.average_sentiment_score * 100
    : 0;

  let sentimentIcon = <FaFaceFrown className="text-danger-300" />;

  if (sentimentScore < 80 && sentimentScore >= 50) {
    sentimentIcon = <FaFaceMeh className="text-yellow-600" />;
  } else if (sentimentScore > 80) {
    sentimentIcon = <FaFaceGrin className="text-primary-400" />;
  }

  const noSentimentYet = analytics.data && data.average_sentiment_score == null;

  if (data.average_sentiment_score == null) {
    sentimentIcon = <FaFaceMeh className="text-yellow-600" />;
  }

  return (
    <>
      <section
        className={cn(
          "mt-12 flex flex-col items-center gap-8",
          inter.className
        )}
      >
        <div className="w-full flex flex-col">
          {data.event_type === "project" && (
            <GoalMeter
              currVal={data.progress}
              target={data.goal}
              unit={data.measurement_unit}
            />
          )}
        </div>
        <div
          className={`flex flex-wrap items-center gap-8 justify-evenly w-full`}
        >
          <StatisticCard
            value={(
              data.current_num_of_participants + data.current_num_of_volunteers
            ).toString()}
            icon={<FaPeopleGroup className={"text-secondary-400"} />}
          >
            <p
              className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
            >
              Total registered users
            </p>
            {
              <p className="lg:text-sm text-xs text-secondary-400 italic">
                *the total amount of users registered in this event (
                {data.event_type === "initiative"
                  ? "participants"
                  : "contributors"}
                /volunteers)
              </p>
            }
          </StatisticCard>

          {data.event_type === "initiative" && (
            <StatisticCard
              value={data.number_of_attending_participants.toString()}
              icon={<FaArrowsDownToPeople className={"text-secondary-400"} />}
            >
              <p
                className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
              >
                Attending Participants
              </p>
              <p className="lg:text-sm text-xs text-secondary-400 italic">
                *Number of participants currently at the event
              </p>
            </StatisticCard>
          )}
          <StatisticCard
            icon={sentimentIcon}
            value={noSentimentYet ? "n/a" : `${sentimentScore.toFixed(1)}%`}
          >
            <p
              className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
            >
              User review sentiment score
            </p>
            <p className="lg:text-sm text-xs text-secondary-400 italic">
              *determines how positive user reviews are overall
            </p>
          </StatisticCard>
        </div>
        <div className="flex items-center justify-center w-full 2xl:gap-24 gap-12 flex-wrap">
          <ChartContainer className="max-w-[700px]">
            <p
              className={cn(
                "mt-2 lg:text-3xl text-xl font-medium text-left w-full pl-5",
                garamond.className
              )}
            >
              Number of{" "}
              {data.event_type === "initiative"
                ? "Participants"
                : "Contributors"}{" "}
              vs Volunteers registered
            </p>
            <p className="lg:text-sm text-xs text-secondary-400 italic text-left w-full pl-5">
              *How many{" "}
              {data.event_type === "initiative"
                ? "participants"
                : "contributors"}{" "}
              are registered compared to how many volunteers are registered.
            </p>
            <ResponsiveContainer className={"grow"} width="100%" height="100%">
              <BarChart
                maxBarSize={120}
                margin={{ top: 40 }}
                layout="horizontal"
                data={[
                  {
                    name:
                      data.event_type === "initiative"
                        ? "Participants"
                        : "Contributors",
                    value: data.current_num_of_participants,
                    fill: COLORS.primary["700"],
                  },
                  {
                    name: "Volunteers",
                    value: data.current_num_of_volunteers,
                    fill: COLORS.primary["600"],
                  },
                ]}
              >
                <XAxis
                  dataKey={"name"}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  fontSize={"clamp(12px, 1vw, 18px)"}
                  interval={0}
                  fontFamily={inter.style.fontFamily}
                  fontWeight={500}
                />
                <Bar dataKey={"value"} fill="fill">
                  <LabelList
                    position={"top"}
                    dataKey={"value"}
                    fill="black"
                    style={{
                      fontWeight: "bold",
                      fontFamily: inter.style.fontFamily,
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          {data.event_type === "initiative" && (
            <ChartContainer>
              <p
                className={cn(
                  "mt-2 lg:text-3xl text-xl font-medium text-left w-full pl-5",
                  garamond.className
                )}
              >
                Participation Registration Days
              </p>
              <p className="lg:text-sm text-xs text-secondary-400 italic text-left w-full px-5">
                *Days where there were participant registration(s) along with
                their count
              </p>
              <ResponsiveContainer
                className={"grow"}
                width="100%"
                height="100%"
              >
                <LineChart
                  data={data.registration_history.slice(0, 10).map((hist) => ({
                    date: new Date(hist.registration_date).toLocaleDateString(),
                    ...hist,
                  }))}
                  margin={{
                    top: 30,
                    right: 50,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <Line
                    type="linear"
                    dataKey="count"
                    stroke={COLORS.secondary[500]}
                    strokeWidth={4}
                  />

                  <XAxis
                    type="category"
                    dataKey={"date"}
                    style={{ fontSize: "clamp(10px, 1vw, 14px)" }}
                  />
                  <YAxis
                    type="number"
                    dataKey={"count"}
                    style={{ fontSize: "clamp(10px, 1vw, 14px)" }}
                    label={{ value: "registration count", angle: 90 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </div>
      </section>
    </>
  );
};

export default EventAnalytics;
