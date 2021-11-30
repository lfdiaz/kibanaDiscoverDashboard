import { Typography, Box } from "@mui/material";
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
import {
  countsByHourDate,
  getDataCount,
  getMinDate,
  getMaxDate,
} from "./elasticSlice";
import moment from "moment";

export type ChartData = {
  date: Date | string;
  count: number;
};

const Graph: FC = () => {
  const maxDate = useAppSelector(getMaxDate);
  const minDate = useAppSelector(getMinDate);
  const data = useAppSelector(countsByHourDate);
  const count = useAppSelector(getDataCount);

  return (
    <div data-testid="dashboard-bar-chart">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography variant="h5">{count.toLocaleString()} hits</Typography>
        <Typography variant="h6">
          {moment(minDate).format("LL @ HH:mm:SSS")} -{" "}
          {moment(maxDate).format("LL @ HH:mm:SSS")}{" "}
        </Typography>
      </Box>
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
          <YAxis
            label={{ value: "Count", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
