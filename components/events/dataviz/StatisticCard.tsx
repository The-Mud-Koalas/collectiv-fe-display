import React from "react";

interface Props extends React.PropsWithChildren {
  value: string;
  icon: React.JSX.Element;
}

const StatisticCard = ({ value, icon, children }: Props) => {
  return (
    <div className="relative grow p-8 min-w-[300px] max-w-lg bg-secondary-200 rounded-lg">
      <p className="lg:text-5xl text-3xl font-bold">{value}</p>
      <div className="absolute top-8 right-8 lg:text-5xl text-4xl">{icon}</div>
      {children}
    </div>
  );
};

export default StatisticCard;
