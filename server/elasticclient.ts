import elasticSearch from "elasticsearch";

export const client = new elasticSearch.Client({
  host: "localhost:9200",
});
