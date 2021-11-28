import React, { FC } from "react";
import { Box } from "@mui/material";
import Graph from "./Graph";
import DetailsTable from "./Table";
import DatePicker from "./DatePicker";
import { useAppDispatch } from "../../app/hooks";
import { getElasticInitialData } from "./elasticSlice";
import { useSearchParams } from "react-router-dom";

const Dashboard: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    const fromDate = newSearchParams.get("fromDate");
    const toDate = newSearchParams.get("toDate");
    const start = newSearchParams.get("start");

    // Get all data on first mount
    dispatch(getElasticInitialData({ fromDate, toDate, start }));
  }, [dispatch, searchParams]);

  return (
    <Box>
      <Box>
        <DatePicker />
      </Box>
      <Box sx={{ minHeight: "300px" }}>
        <Graph />
      </Box>
      <Box>
        <DetailsTable />
      </Box>
    </Box>
  );
};

export default Dashboard;
