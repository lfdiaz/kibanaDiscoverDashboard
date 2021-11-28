import React from "react";
import {
  Popover,
  Box,
  InputAdornment,
  Typography,
  FormControl,
  Input,
  Button,
  TextField,
} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RefreshIcon from "@mui/icons-material/Refresh";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { FC } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import { getElasticInitialData } from "./elasticSlice";
import { useAppDispatch } from "../../app/hooks";
import { useSearchParams } from "react-router-dom";
import moment from "moment";

const DatePicker: FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [element, setElement] = React.useState<HTMLDivElement | null>(null);
  const [from, setFrom] = React.useState<moment.Moment | null>();
  const [to, setTo] = React.useState<moment.Moment | null>();

  React.useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    const fromDate = newSearchParams.get("fromDate");
    const toDate = newSearchParams.get("toDate");

    if (fromDate) setFrom(moment(fromDate));
    if (toDate) setTo(moment(toDate));
  }, [searchParams]);

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setElement(event.currentTarget);
    },
    [setElement]
  );

  const handleClose = React.useCallback(() => {
    setElement(null);
  }, [setElement]);

  const onRefreshClick = React.useCallback(() => {
    // Since we are storing the query on the url, pull it and make a new search
    const newSearchParams = new URLSearchParams(searchParams);
    const fromDate = newSearchParams.get("fromDate");
    const toDate = newSearchParams.get("toDate");

    dispatch(getElasticInitialData({ fromDate, toDate, start: 0 }));
  }, [searchParams, dispatch]);

  const onSearch = React.useCallback(() => {
    if (!from && !to) return;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("fromDate", from?.format() || "");
    newSearchParams.set("toDate", to?.format() || "");
    // Store the query on the URL for better sharing functionality
    setSearchParams(newSearchParams);
    dispatch(
      getElasticInitialData({ fromDate: from?.format(), toDate: to?.format() })
    );
    handleClose();
  }, [dispatch, from, to, setSearchParams, searchParams]);

  const open = Boolean(element);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end">
      <FormControl
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 0.5fr",
          minWidth: "400px",
        }}
      >
        <Input
          onClick={handleClick}
          startAdornment={
            <InputAdornment position="start">
              <DateRangeIcon />
              <KeyboardArrowDownIcon />
            </InputAdornment>
          }
          endAdornment={
            !from &&
            !to && (
              <InputAdornment position="end">
                <Typography variant="body1">Show Dates</Typography>
              </InputAdornment>
            )
          }
          value={`${from?.toString() || ""} - ${to?.toString() || ""}`}
        />
        <Button startIcon={<RefreshIcon />} onClick={onRefreshClick}>
          <Typography variant="subtitle1">Refresh</Typography>
        </Button>
      </FormControl>
      <Popover open={open} id={id} anchorEl={element} onClose={handleClose}>
        <Box
          padding="22px"
          display="grid"
          gridTemplateColumns="1fr 1fr"
          columnGap="12px"
          rowGap="12px"
        >
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              label="From"
              value={from}
              onChange={setFrom}
              renderInput={(props) => <TextField {...props} />}
            />
            <DateTimePicker
              label="To"
              value={to}
              onChange={setTo}
              renderInput={(props) => <TextField {...props} />}
            />
          </LocalizationProvider>
          <Box gridColumn="2">
            <Button onClick={onSearch} variant="contained" color="success">
              Search
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default DatePicker;
