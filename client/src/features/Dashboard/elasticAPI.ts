import axios from "axios";

export function fetchElasticData(
  fromDate?: string | null,
  toDate?: string | null,
  start?: number | null | string
) {
  let url = "/api/elastic/search";
  const searchParams = new URLSearchParams();

  if (fromDate && toDate) {
    searchParams.append("fromDate", fromDate);
    searchParams.append("toDate", toDate);
    if (start) searchParams.append("start", `${start}`);

    url = `${url}?${searchParams.toString()}`;
  }

  return axios.get(url);
}
