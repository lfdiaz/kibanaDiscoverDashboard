import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import elasticRoute from "./routes/elasticsearch";
import { createProxyMiddleware } from "http-proxy-middleware";
import opn from "open";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV;

app.use(express.json());

app.use("/api", elasticRoute);

/*

  On development we want to redirect all routes to the react url

*/
if (!NODE_ENV) {
  app.get(
    "*",
    createProxyMiddleware({
      changeOrigin: true,
      target: "http://localhost:3000",
    })
  );
} else {
  // On production/staging we want to send the build folder back to the client
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../client/build"));
  });
}

app.listen(PORT, () => {
  // Only open the browser on development environment
  // TODO: Use better-opn to avoid opening a new tab on server restart
  if (!NODE_ENV) opn(`http://localhost:${PORT}`);
  console.log(`Listening on port ${PORT}`);
});
