import express, { Request, Response } from "express";
import axios from "axios";
import { client } from "../elasticclient";
const router = express.Router();
import config from "../configs";

router.route("/elastic/search").get(async (req: Request, res: Response) => {
  const { start = 0, fromDate, toDate } = req.query;

  try {
    const response = await client.search({
      index: "kibana_sample_data_logs",
      body: {
        from: start,
        size: 20,
        query: {
          range: {
            timestamp: {
              gte: fromDate,
              lte: toDate,
            },
          },
        },
      },
    });

    res.json(response);
  } catch (e) {
    res.status(400).json((e as Error).message);
  }
});

export default router;
