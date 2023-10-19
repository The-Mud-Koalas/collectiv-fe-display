import { getRequest } from "@/lib/fetch";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import {
  FaArrowsDownToPeople,
  FaFaceFrown,
  FaFaceGrin,
  FaFaceMeh,
} from "react-icons/fa6";
import { ChartContainer, StatisticCard } from "../events/dataviz";
import { garamond, inter } from "@/utils/constants/fonts";
import { BeatLoader } from "react-spinners";
import { COLORS } from "@/utils/constants/colors";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import cn from "clsx";

interface Props {
  locationId: string;
}

const LocationAnalytics = ({ locationId }: Props) => {
  const participationData = useQuery({
    queryKey: ["location-participation-data", locationId],
    queryFn: async () => {
      return (await getRequest({
        endpoint: `/analytics/space/participation-count/${locationId}`,
      })) as LocationParticipationData;
    },
  });
  const projectGoalsData = useQuery({
    queryKey: ["location-project-goals-data", locationId],
    queryFn: async () => {
      return (await getRequest({
        endpoint: `/analytics/space/project-contributions/${locationId}`,
      })) as LocationProjectGoalsData;
    },
  });
  const ratingData = useQuery({
    queryKey: ["location-rating-data", locationId],
    queryFn: async () => {
      return (await getRequest({
        endpoint: `/analytics/space/event-ratings/${locationId}`,
      })) as LocationRatingData;
    },
  });
  const sentimentData = useQuery({
    queryKey: ["location-sentiment-data", locationId],
    queryFn: async () => {
      return (await getRequest({
        endpoint: `/analytics/space/event-sentiments/${locationId}`,
      })) as LocationSentimentData;
    },
  });
  const eventData = useQuery({
    queryKey: ["location-event-data", locationId],
    queryFn: async () => {
      return (await getRequest({
        endpoint: `/analytics/space/event-counts/${locationId}`,
      })) as LocationEventData;
    },
  });

  const sentimentScore = sentimentData.data?.average_sentiment_score
    ? sentimentData.data.average_sentiment_score * 100
    : 0;

  let sentimentIcon = <FaFaceFrown className="text-danger-300" />;

  if (sentimentScore < 80 && sentimentScore >= 50) {
    sentimentIcon = <FaFaceMeh className="text-yellow-600" />;
  } else if (sentimentScore > 80) {
    sentimentIcon = <FaFaceGrin className="text-primary-400" />;
  }

  const noSentimentYet = sentimentData.data?.average_sentiment_score == null;

  if (noSentimentYet) {
    sentimentIcon = <FaFaceMeh className="text-yellow-600" />;
  }

  const noRatingYet =
    !ratingData.data || ratingData.data.average_rating == null;

  let ratingIcon = <BsStar className="text-danger-200" />;

  if (
    ratingData.data &&
    ratingData.data.average_rating > 2 &&
    ratingData.data.average_rating < 4
  ) {
    ratingIcon = <BsStarHalf className="text-gray-300" />;
  } else if (ratingData.data && ratingData.data.average_rating > 4) {
    ratingIcon = <BsStarFill className="text-orange-300" />;
  }

  let totalUsers = 0;

  if (participationData.data) {
    const data = participationData.data.participation_data;
    totalUsers =
      data.contributors_in_location +
      data.participants_in_location +
      data.volunteers_count_in_location;
  }

  const showcasedGoals = useMemo(() => {
    const colors = [
      COLORS.primary[300],
      COLORS.primary[400],
      COLORS.primary[500],
      COLORS.primary[600],
      COLORS.primary[700],
      COLORS.secondary[300],
      COLORS.secondary[400],
      COLORS.secondary[500],
      COLORS.gray["400"],
      COLORS.gray["600"],
    ];
    if (!projectGoalsData.data) return [];
    const sorted = projectGoalsData.data.contribution_data
      .slice()
      .sort((a, b) => b.total_contribution - a.total_contribution);
    const topTen = sorted.slice(0, 10);

    const mappedForBarChart = topTen
      .filter((goal) => goal.total_contribution > 0)
      .map((goal, i) => ({
        name: `${goal.goal_kind} (${goal.measurement_unit})`,
        value: goal.total_contribution,
        caption: `${goal.total_contribution} ${goal.measurement_unit} ${goal.goal_kind}`,
        fill: colors[i],
      }));
    return mappedForBarChart;
  }, [projectGoalsData.data]);

  return (
    <div className="mt-4 flex flex-col gap-6">
      <div className="flex items-center justify-center gap-8 flex-wrap">
        {
          <StatisticCard
            icon={
              sentimentData.isLoading ? (
                <BeatLoader color={COLORS.primary[500]} />
              ) : (
                sentimentIcon
              )
            }
            value={noSentimentYet ? "-" : `${sentimentScore.toFixed(1)}%`}
          >
            <p
              className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
            >
              Average user sentiment score
            </p>
            <p className="lg:text-sm text-xs text-secondary-400 italic">
              *how positive user reviews are overall across events in this
              location
            </p>
          </StatisticCard>
        }
        <StatisticCard
          icon={
            ratingData.isLoading ? (
              <BeatLoader color={COLORS.primary[500]} />
            ) : (
              ratingIcon
            )
          }
          value={noRatingYet ? "-" : `${ratingData.data!.average_rating}`}
        >
          <p
            className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
          >
            Average event rating
          </p>
          <p className="lg:text-sm text-xs text-secondary-400 italic">
            *Average of all event ratings across this location
          </p>
        </StatisticCard>
        <StatisticCard
          icon={
            participationData.isLoading ? (
              <BeatLoader color={COLORS.primary[500]} />
            ) : (
              <FaArrowsDownToPeople className={"text-secondary-400"} />
            )
          }
          value={participationData.isLoading ? "-" : `${totalUsers}`}
        >
          <p
            className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
          >
            Collectiv users actively participating
          </p>
          <p className="lg:text-sm text-xs text-secondary-400 italic">
            *Total participating users (participants/volunteers/contributors) in
            this location across all events
          </p>
        </StatisticCard>
      </div>
      <div className="flex items-center justify-center w-full 2xl:gap-24 gap-12 flex-wrap">
        <ChartContainer>
          <p
            className={cn(
              "mt-2 lg:text-3xl text-xl font-medium text-left w-full pl-5",
              garamond.className
            )}
          >
            Events in location
          </p>
          <p className="lg:text-sm text-xs text-secondary-400 italic text-left w-full pl-5">
            *The events in this location grouped by type
          </p>

          {eventData.data && (
            <ResponsiveContainer className={"grow"} width="100%" height="100%">
              <BarChart
                layout="horizontal"
                data={[
                  {
                    name: "Events",
                    value:
                      eventData.data.event_count_data.num_of_events_in_location,
                    fill: COLORS.secondary["500"],
                  },
                  {
                    name: "Initiatives",
                    value:
                      eventData.data.event_count_data
                        .num_of_initiatives_in_location,
                    fill: COLORS.secondary["300"],
                  },
                  {
                    name: "Projects",
                    value:
                      eventData.data.event_count_data
                        .num_of_projects_in_location,
                    fill: COLORS.secondary["400"],
                  },
                ]}
              >
                <XAxis
                  dataKey={"name"}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  fontSize={"clamp(8px, 1vw, 18px)"}
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
          )}
        </ChartContainer>
        <ChartContainer>
          <p
            className={cn(
              "mt-2 lg:text-3xl text-xl font-medium text-left w-full pl-5",
              garamond.className
            )}
          >
            Collectiv active user role demographic
          </p>
          <p className="lg:text-sm text-[10px] text-secondary-400 italic text-left w-full pl-5">
            *Currently participating users group by event role
          </p>

          {participationData.data && (
            <ResponsiveContainer className={"grow"} width="100%" height="80%">
              <BarChart
                layout="horizontal"
                data={[
                  {
                    name: "Participants",
                    value:
                      participationData.data.participation_data
                        .participants_in_location,
                    fill: COLORS.primary["700"],
                  },
                  {
                    name: "Volunteers",
                    value:
                      participationData.data.participation_data
                        .volunteers_count_in_location,
                    fill: COLORS.primary["600"],
                  },
                  {
                    name: "Contributors",
                    value:
                      participationData.data.participation_data
                        .contributors_in_location,
                    fill: COLORS.primary["500"],
                  },
                ]}
              >
                <XAxis
                  dataKey={"name"}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  fontSize={"clamp(8px, 1vw, 18px)"}
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
          )}
        </ChartContainer>
      </div>
      <div className="flex items-center justify-center w-full 2xl:gap-24 gap-12 flex-wrap">
        <div
          className={cn(
            "2xl:w-[600px] w-[min(100%,_500px)] text-primary-700 font-semibold h-fit flex flex-col items-center aspect-video py-2 text-6xl lg:text-7xl",
            garamond.className
          )}
        >
          <p className="my-auto">
            Look at what this location has achieved for our community.
          </p>
        </div>
        <ChartContainer className="!min-h-[600px]">
          <p
            className={cn(
              "mt-2 lg:text-3xl text-2xl font-medium text-left w-full pl-5",
              garamond.className
            )}
          >
            Projects in location contribution showcase:
          </p>
          <p className="lg:text-sm text-xs text-secondary-400 italic text-left w-full pl-5">
            *Top 10 past/current project goals by their contribution amount
          </p>
          {showcasedGoals.length > 0 ? (
            <ResponsiveContainer className={"grow"} width="100%" height="100%">
              <BarChart
                margin={{ left: 20, top: 20, right: 150 }}
                layout="vertical"
                data={showcasedGoals}
                barCategoryGap={10}
              >
                <YAxis dataKey="name" type="category" hide />
                <XAxis type="number" dataKey={"value"} hide />
                <Bar maxBarSize={200} dataKey={"value"} fill="fill">
                  <LabelList
                    position={"right"}
                    dataKey={"caption"}
                    fill="black"
                    style={{
                      fontWeight: "bold",
                      fontFamily: inter.style.fontFamily,
                      fontSize: "clamp(14px, 1.5vw, 20px)",
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className={cn("grow flex items-center justify-center lg:text-5xl text-3xl italic text-primary-700 px-6 text-center", garamond.className)}>No project contributions to showcase yet!</p>
          )}
        </ChartContainer>
      </div>
    </div>
  );
};

export default LocationAnalytics;
