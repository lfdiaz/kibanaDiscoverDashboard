import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchElasticData } from "./elasticAPI";
import { convertNestedObj } from "./helpers";
import moment from "moment";

export interface ElasticState {
  // Since the elastic data is constantly changing, not sure if its a good idea to set a type. Maybe if we knew it was constant
  elasticData: Array<{ [k: string]: any }>;
  loading: boolean;
  error: SerializedError | null;
  count: number;
  selectedHeaders: Array<string>;
  minDate: Date | string | null;
  maxDate: Date | string | null;
}

const initialState: ElasticState = {
  elasticData: [],
  loading: false,
  error: null,
  count: 0,
  minDate: null,
  maxDate: null,
  selectedHeaders: [
    "_source.clientip",
    "_source.geo.src",
    "_source.request",
    "_source.response",
  ],
};

type ElasticApiSearch = {
  fromDate?: string | null;
  toDate?: string | null;
  start?: number | null | string;
};

export const getElasticInitialData = createAsyncThunk(
  "elastic/initialFetch",
  async ({ fromDate, toDate, start }: ElasticApiSearch) => {
    const response = await fetchElasticData(fromDate, toDate, start);
    return {
      data: response.data.hits.hits,
      count: response.data.hits.total.value,
      maxDate: new Date(response.data.aggregations.max_date.value),
      minDate: new Date(response.data.aggregations.min_date.value),
    };
  }
);

export const elasticSlice = createSlice({
  name: "elastic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getElasticInitialData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getElasticInitialData.fulfilled,
        (
          state,
          action: PayloadAction<{
            count: number;
            data: Array<{ [k: string]: any }>;
            maxDate: Date;
            minDate: Date;
          }>
        ) => {
          state.count = action.payload.count;
          state.maxDate = action.payload.maxDate;
          state.minDate = action.payload.minDate;
          /*
            Since we want all the data in a big object instead of nested object
            so its easier to read for the table we need to convert it before saving it 
          */
          state.elasticData = action.payload.data.map((d) =>
            convertNestedObj(d, "")
          );
          state.loading = false;
        }
      )
      .addCase(getElasticInitialData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

/*

    SELECTORS

*/

// TODO: Remove the _source keyword from all the keys in the object to be the same as kibana

export const countsByHourDate = (state: RootState) => {
  const data = state.elastic.elasticData;
  // Should we sort by dates or format the date and compare it to add it to the reducer?
  const countByDate = data.reduce((r: { [key: string]: number }, data) => {
    const timestamp = moment(data["_source.timestamp"]);
    // This will only return the day without hours and minutes
    const format = timestamp.format("L");
    // Set the new date to have the same hour as the data timestamp
    const today = moment(format).hour(timestamp.hour()).toString();
    // Set the hour to be the same as the timestamp
    if (!r[today]) {
      r[today] = 1;
    } else {
      r[today] += 1;
    }
    return r;
  }, {});
  const countByDateArray = Object.keys(countByDate).map((k: string) => ({
    date: k.toString(),
    count: countByDate[k],
  }));
  return countByDateArray;
};

export const getDataCount = (state: RootState) => state.elastic.count;

export const getMaxDate = (state: RootState) => state.elastic.maxDate;
export const getMinDate = (state: RootState) => state.elastic.minDate;

export const getSelectedHeaders = (state: RootState) =>
  state.elastic.selectedHeaders;

export const getElasticData = (state: RootState) => state.elastic.elasticData;

export default elasticSlice.reducer;
