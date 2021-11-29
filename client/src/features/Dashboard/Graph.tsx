import { FC } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Label,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "../../app/hooks";
import { countsByHourDate } from "./elasticSlice";

export type ChartData = {
  date: Date | string;
  count: number;
};

const Graph: FC = () => {
  const data = useAppSelector(countsByHourDate);

  return (
    <div data-testid="dashboard-bar-chart">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 20, left: 20, right: 20, bottom: 20 }}
        >
          <XAxis dataKey="date">
            <Label
              value="timestamp per hour"
              position="insideBottom"
              offset={-14}
            />
          </XAxis>
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
