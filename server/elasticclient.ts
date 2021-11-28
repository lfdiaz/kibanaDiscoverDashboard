import { Client } from "@elastic/elasticsearch";

const ELASTIC_HOST = process.env.ELASTIC_HOST || "http://localhost:9200";

export const client = new Client({
  node: ELASTIC_HOST,
});
