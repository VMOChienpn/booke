import { ReactElement } from "react";

interface DashboardCardProps {
  icon: ReactElement;
  count: number;
  title: string;
}

const DashboardCard = ({ icon, count, title }: DashboardCardProps) => (
  <div className="flex flex-col items-center justify-between ">
    <div className="text-3xl">{icon}</div>
    <h4 className="mb-3 text-6xl my-6 font-semibold">{count}</h4>
    <p>{title}</p>
  </div>
);

export default DashboardCard;
