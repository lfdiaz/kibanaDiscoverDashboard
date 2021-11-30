import staging from "./staging";
import production from "./production";

type NODE_ENV_TYPES = "staging" | "production" | "local" | null;

const NODE_ENV: NODE_ENV_TYPES =
  (process.env.NODE_ENV as NODE_ENV_TYPES) || "local";

const config = {
  staging,
  production,
  local: staging,
};

export default config[NODE_ENV];
