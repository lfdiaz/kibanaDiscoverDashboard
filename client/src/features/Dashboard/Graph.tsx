import { FC } from "react";
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, Label } from "recharts";
import Box from "@mui/material/Box";
import { useAppSelector } from "../../app/hooks";
import { countsByHourDate } from "./elasticSlice";

export type ChartData = {
  date: Date | string;
  count: number;
};

const Graph: FC = () => {
  const data = useAppSelector(countsByHourDate);

  return (
    <Box width="100%">
      <BarChart data={data} width={800} height={250}>
        <XAxis dataKey="date">
          <Label value="timestamp per hour" position="insideBottom" />
        </XAxis>
        <YAxis label={{ value: "Count", angle: -90 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </Box>
  );
};

export default Graph;
